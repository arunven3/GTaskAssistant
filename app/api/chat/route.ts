import { NextRequest } from "next/server";
import { GoogleSearch } from "@/app/api/chat/tools/GoogleSearch";
import { getGoogleCalendarEvents } from "@/app/api/chat/tools/GoogleCalendar";
// import fetch from "node-fetch";
export const runtime = "nodejs";

const LLAMA_URL = "http://127.0.0.1:8080/v1/chat/completions";

const systemPrompt = {
  role: "system",
  content: `
  You are a useful AI assistant named "GTaskAssistant". Answer the user's question carefully.
        Current date: "2025-08-22"
        Timezone: "Asia/Kolkata" (+05:30)

      - Answer from your own knowledge (math, logic, general facts), ALWAYS answer directly.
      - Only call a tool when: external website data is required (e.g., news, prices, weather, search).
      - When the user asks about appointments, schedules, or calendar events (anything related to Google Calendar) response get_calendar tool
      - Only call a tool when needed chose any one tool:
          • Use calendar for anything about appointments, schedules, or calendar events (Google Calendar). Example JSON: {calendar: {"date_range": {"start": "YYYY-MM-DDTHH:mm:ss","end": "YYYY-MM-DDTHH:mm:ss"}}}
          • Use googleSearch for real-time or external web information (news, prices, weather, etc.).


      - When calling a tool, respond ONLY with JSON: { "tool": "<toolName>", "arguments": { ... } }
      - Do not use markdowndata for tools.
      - After receiving tool results, summarize for the user in plain language.
      - For normal answers, use markdown and DO NOT start with JSON.

      TOOLS:
      - googleSearch: { "query": string }  -> Search the internet for real-time information.
      - calendar: {"arguments": {"start": "YYYY-MM-DDTHH:mm:ss","end": "YYYY-MM-DDTHH:mm:ss"}} -> get google calender events
    `,
};

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const message = messages[messages.length - 1].content;

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

            // console.log(decodedValue);

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
                  systemPrompt,
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
              // console.log(chunkContent);
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

      await callLLM([systemPrompt, { role: "user", content: message }]);
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/json" },
  });
}
