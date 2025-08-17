import { error } from "console";
import { NextRequest } from "next/server";
import { getCalendarEvents } from "./CalendarEvents";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body ?? {};
    const isToolResponse = false;
    let fullText = "";
    const today = new Date().toDateString();

    const promtMessage = [
      {
        role: "system",
        content: `
          You are a useful assistant. Your name is "GTaskAssistant". today date is ${today}

          Behavior rules:
          - When the user asks about appointments, schedules, or calendar events (anything related to Google Calendar):
              • Extract the exact date or time range they want.
              • Convert relative dates (like "tomorrow", "next week", "Friday afternoon") into absolute ISO 8601 timestamps.
              • Respond ONLY in valid JSON with this exact schema:
                {
                  "tool": {
                    "action": "get_calendar",
                    "date_range": {
                      "start": "YYYY-MM-DDTHH:mm:ss",
                      "end": "YYYY-MM-DDTHH:mm:ss"
                    }
                  }
                }
              • No extra text, no explanation.

          - For all other topics (not related to calendar or scheduling):
              • Respond in natural language as a friendly assistant.
              • Use **markdown formatting** where appropriate.
              • Do **NOT** start the response with '{ or raw JSON
        `,
      },
    ];

    messages.forEach((element) => {
      promtMessage.push(element);
    });
    console.log(promtMessage);

    const ishCheckToolFinished = false;
    const upstream = await fetch("http://127.0.0.1:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2:3b",
        // model: "tinyllama:1.1b",
        messages: promtMessage,
        stream: true,
      }),
    });

    if (!upstream.ok || !upstream.body) {
      return new Response(`Ollama error: ${upstream.status}, { status: 500 }`);
    }

    const readable = new ReadableStream({
      async start(controller) {
        const reader = upstream.body.getReader();
        const toolHandled = false;

        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            if (toolHandled) {
              // prevent writing after follow-up started
              continue;
            }

            const chunkText = new TextDecoder().decode(value);

            try {
              fullText +=
                JSON.parse(chunkText).message?.content.replace(
                  /[\n\r\s]/g,
                  "",
                ) || "";
            } catch {}

            if (fullText.startsWith("{")) {
              try {
                const toolData = JSON.parse(fullText);
                const calendarResult = await getCalendarEvents(toolData);

                const userMessage = messages[messages.length - 1];

                const promt = [
                  {
                    role: "system",
                    content: `
                      You are a helpful assistant named "GTaskAssistant". Your job is to summarize the given calendar data.

                      - The user asked: "${userMessage.content}"
                      - Calendar data: ${JSON.stringify(calendarResult)}

                      Instructions:
                      1. Answer in **friendly, plain natural language**.
                      2. Highlight **names** and **timings** using markdown bold (e.g., **Name**, **00:01 AM - 00:02 AM**).
                      3. Do **NOT** show JSON or raw data.
                      4. Do **NOT** repeat the user's question.
                      5. Do **NOT** explain your reasoning or steps.
                      6. Provide only the **final answer**.
                    `,
                  },
                ];

                console.log(promt);

                const followUp = await fetch(
                  "http://localhost:11434/api/chat",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      model: "qwen2:1.5b",
                      messages: promt,
                      stream: true,
                    }),
                  },
                );

                const followReader = followUp.body!.getReader();

                while (true) {
                  const { value: fValue, done: fDone } =
                    await followReader.read();

                  if (fDone) {
                    controller.close();
                    break;
                  }

                  controller.enqueue(fValue);
                  // console.log(new TextDecoder().decode(fValue));
                }
              } catch (err) {
                // console.log(fullText);
              }
            } else {
              controller.enqueue(value);
            }
          }
        } catch (err) {
          console.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "application/x-ndjson",
        "Cache-Control": "no-cache, no-transform",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err: any) {
    console.log(err);
    return new Response(`Proxy error: ${err?.message ?? err}, { status: 500 }`);
  }
}
