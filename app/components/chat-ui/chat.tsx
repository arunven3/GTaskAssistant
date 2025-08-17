"use client";

import React, { useState, useEffect, useRef } from "react";
import { SystemChatBubble } from "./SystemChatBubble";
import { UserChatBubble } from "./UserChatBubblee";

type Msg = { role: "user" | "system" | "assistant"; message: string };

export const Chat = () => {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "system",
      message: "I'm your personal virtual assistant. How can I help?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (m: Msg) => setMessages((prev) => [...prev, m]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) {
      return false;
    }

    const text = input.trim();
    if (!text || loading) return;

    addMessage({ role: "user", message: text });
    setInput("");

    const assistantIndex = messages.length + 1;

    setLoading(true);
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const ollamaMessages = [
        ...messages.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.message,
        })),
        { role: "user", content: text },
      ];

      const res = await fetch("/api/ollama", {
        method: "POST",
        signal: abortRef.current.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: ollamaMessages,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`Request failed: ${res.status}`);
      }

      addMessage({ role: "assistant", message: "" });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          try {
            const json = JSON.parse(trimmed);
            if (json.message?.content) {
              const token: string = json.message.content;

              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[assistantIndex];

                if (last && last.role === "assistant") {
                  updated[assistantIndex] = {
                    ...last,
                    message: last.message + token,
                  };
                }
                return updated;
              });
            }
            if (json.done) {
            }
          } catch {}
        }
      }
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        addMessage({
          role: "system",
          message: "⚠️ Error talking to the local model. Is Ollama running?",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const getChatDatas = () => {
    return messages.map((message, index) => {
      if (message.role === "user") {
        return <UserChatBubble key={index} message={message.message} />;
      } else {
        return <SystemChatBubble key={index} message={message.message} />;
      }
    });
  };

  const stop = () => {
    abortRef.current?.abort();
    setLoading(false);
  };

  return (
    <div>
      <div className="flex h-[100dvh] flex-col justify-end">
        <div className="space-y-3 overflow-y-auto px-4 py-6">
          {messages.map((m, i) =>
            m.role === "user" ? (
              <UserChatBubble key={i} message={m.message} />
            ) : (
              <SystemChatBubble key={i} message={m.message} />
            ),
          )}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={onSubmit}
          className="border-t border-gray-200 bg-gray-100 p-2 p-3 dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex items-end gap-2 rounded-lg">
            <textarea
              id="chat"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows="1"
              className="mx-4 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Your message..."
            ></textarea>

            <button
              type="submit"
              className="text-grey-900 inline-flex cursor-pointer justify-center rounded-full p-2 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              {!loading ? (
                <svg
                  className="h-5 w-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
              ) : (
                <svg
                  onClick={stop}
                  className="h-[30px] w-[30px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Z" />
                </svg>
              )}
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
