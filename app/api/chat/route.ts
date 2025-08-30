import { NextRequest, NextResponse } from "next/server";
import { GoogleSearch } from "@/app/api/chat/tools/GoogleSearch";
import { getGoogleCalendarEvents } from "@/app/api/chat/tools/GoogleCalendar";
import { getAllMatchingChunks } from "@/lib/RAG/base";

export const runtime = "nodejs";

const LLAMA_URL = "http://127.0.0.1:8080/v1/chat/completions";

const getSystemPrompt = (context: string = "") => {
  let contextPrompt = "";

  if (context.length > 1) {
    contextPrompt = `- If the retrieved CONTEXT contains information relevant to the user query, use it to improve or ground your answer.. Context: ${context}`;
  }

  const prompt = {
    role: "system",
    content: `
You are a useful AI assistant named "PTaskAssistant". Answer the user's question carefully.
Current date: "2025-08-22"
Timezone: "Asia/Kolkata" (+05:30)

- Answer from your own knowledge (math, logic, general facts). ALWAYS answer directly.
${contextPrompt}
- Only call a tool when external website data is required (e.g., news, prices, weather, search).
- When the user asks about appointments, schedules, or calendar events, respond using the "calendar" tool.

- Only call ONE tool at a time:
  • calendar → for appointments, schedules, or calendar events. Example: { "tool": "calendar", "arguments": { "start": "YYYY-MM-DDTHH:mm:ss", "end": "YYYY-MM-DDTHH:mm:ss" } }
  • googleSearch → for real-time or external web info (news, prices, weather, etc.). Example: { "tool": "googleSearch", "arguments": { "query": "string" } }

- When calling a tool, respond ONLY with JSON (no markdown).
- After receiving tool results, summarize for the user in plain language.
- For normal answers, use markdown and DO NOT start with JSON.

TOOLS:
- googleSearch: { "query": string } → Search the internet for real-time information.
- calendar: { "start": "YYYY-MM-DDTHH:mm:ss", "end": "YYYY-MM-DDTHH:mm:ss" } → Get Google Calendar events.
    `,
  };

  return prompt;
};

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const UserMessage = messages[messages.length - 1].content;
  const context = (await getAllMatchingChunks(UserMessage)) || "";

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let buffer = "";

  const stream = new ReadableStream({
    async start(controller) {
      async function callLLM(message: any[]) {
        console.log(message);

        const resp = await fetch(LLAMA_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: message,
            stream: true,
            temperature: 0.7,
          }),
        });

        const reader = resp.body!.getReader();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const decodedValue = decoder.decode(value).substring(6);

          try {
            const chunkContent =
              JSON.parse(decodedValue).choices[0].delta.content;

            try {
              buffer += chunkContent.replace(/```json|```|[\n\r\s]/g, "") || "";
            } catch (err) {}

            if (buffer.startsWith("{")) {
              try {
                const toolCall = JSON.parse(buffer.trim());
                buffer = "";
                let toolResult: any;

                if (toolCall.tool === "googleSearch") {
                  controller.enqueue(
                    encoder.encode(
                      JSON.stringify({
                        done,
                        content: "",
                        status: "Searching on Google...",
                      }),
                    ),
                  );

                  toolResult = await GoogleSearch(toolCall.arguments.query);
                } else if (toolCall.tool === "calendar") {
                  toolResult = await getGoogleCalendarEvents(toolCall);
                }

                await callLLM([
                  getSystemPrompt(),
                  { role: "user", content: JSON.stringify(message) },
                  { role: "assistant", content: JSON.stringify(toolCall) },
                  { role: "tool", content: JSON.stringify(toolResult) },
                ]);
                return;
              } catch (err) {
                buffer = buffer.replace("```", "").replace("{json", "");
                // console.error("error:", buffer,err);
              }
            } else {
              buffer = "";
              controller.enqueue(
                encoder.encode(
                  // "data: " +
                  JSON.stringify({
                    done,
                    content: chunkContent,
                    status: "Thinking...",
                  }),
                ),
              );
            }
          } catch (err) {}
        }
      }

      await callLLM([
        getSystemPrompt(context),
        { role: "user", content: UserMessage },
      ]);

      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(req: NextRequest) {
  const context = (await getAllMatchingChunks("Who is Arun")) || "";

  return NextResponse.json({ context });
}
