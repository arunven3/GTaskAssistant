"use client";

import React, { useState, useEffect, useRef } from "react";
import { SystemChatBubble } from "./SystemChatBubble";
import { UserChatBubble } from "./UserChatBubblee";

type Msg = {
  role: "user" | "system" | "assistant";
  message: string;
  status: string;
};

export const Chat = () => {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "system",
      message: "I'm your personal virtual assistant. How can I help?",
      status: "",
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

    addMessage({ role: "user", message: text, status: "" });
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

      const res = await fetch("/api/chat", {
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

      let status = "Sending Message";

      addMessage({ role: "assistant", message: "", status });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";
      let accumulatedContent = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        // Accumulate the raw response
        fullResponse += decoder.decode(value, { stream: true });
      }

      console.log("Full raw response:", fullResponse);

      // Now parse the accumulated response
      // The response contains multiple JSON objects separated by }{
      const jsonStrings = fullResponse.split("}{");

      for (let i = 0; i < jsonStrings.length; i++) {
        let jsonStr = jsonStrings[i];

        // Fix the JSON string
        if (i === 0 && !jsonStr.startsWith("{")) {
          jsonStr = "{" + jsonStr;
        } else if (i > 0) {
          jsonStr = "{" + jsonStr;
        }
        if (i < jsonStrings.length - 1) {
          jsonStr = jsonStr + "}";
        }

        try {
          const streamResponse = JSON.parse(jsonStr);
          console.log("Parsed response:", streamResponse);

          // Accumulate content if it exists
          if (
            streamResponse.content !== undefined &&
            streamResponse.content !== null
          ) {
            accumulatedContent += streamResponse.content;
          }

          // Update the message with accumulated content and status
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[assistantIndex];

            if (last && last.role === "assistant") {
              updated[assistantIndex] = {
                ...last,
                message: accumulatedContent,
                status: streamResponse.status || last.status,
              };
            }

            return updated;
          });
        } catch (err) {
          console.error("Failed to parse JSON chunk:", jsonStr, err);
        }
      }
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        addMessage({
          role: "system",
          message: "⚠️ Error",
          status: "",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const stop = () => {
    abortRef.current?.abort();
    setLoading(false);
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      if (
        lastMessage &&
        lastMessage.role === "assistant" &&
        lastMessage.status !== "completed"
      ) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-80 md:flex-col">
        <div className="flex flex-grow flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              PTaskAssistant Chat
            </h2>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Online
              </span>
            </div>
          </div>

          {/* Chat Info */}
          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="mb-3 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  GTaskAssistant
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Always here to help
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Messages today
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {messages.length - 1}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Response time
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ~2s
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4">
            {/* <h4 className="mb-3 font-medium text-gray-900 dark:text-white">
              Quick Actions
            </h4> */}
            <div className="space-y-2">
              {/* <button className="w-full rounded-lg p-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                📝 Create a task
              </button>
              <button className="w-full rounded-lg p-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                📅 Schedule meeting
              </button>
              <button className="w-full rounded-lg p-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                📄 Analyze document
              </button>
              <button className="w-full rounded-lg p-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                🔍 Search knowledge
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <div className="border-b border-gray-200 bg-white p-4 md:hidden dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Chat
            </h1>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white px-4 py-6 dark:from-gray-900 dark:to-gray-800">
          <div className="mx-auto max-w-4xl space-y-6">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <UserChatBubble key={i} message={m.message} />
              ) : (
                <SystemChatBubble
                  key={i}
                  status={m.status}
                  message={m.message}
                />
              ),
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input Form */}
        <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto max-w-4xl">
            <form onSubmit={onSubmit} className="flex items-center gap-3">
              {loading && (
                <div className="mt-3 flex w-full items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="animate-pulse">
                    AI is generating response...
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500"></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  {/* <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                    Click stop to cancel
                  </span> */}
                </div>
              )}

              {!loading && (
                <div className="relative flex-1">
                  <textarea
                    id="chat"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={1}
                    className="w-full resize-none rounded-2xl border border-gray-300 bg-gray-50 p-4 pr-12 text-sm text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                    placeholder="Type your message here..."
                    style={{ minHeight: "48px", maxHeight: "120px" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        onSubmit(e as any);
                      }
                    }}
                  />
                  <div className="absolute right-3 bottom-3 text-xs text-gray-400 dark:text-gray-500">
                    Shift+Enter for new line
                  </div>
                </div>
              )}

              <button
                type={loading ? "button" : "submit"}
                disabled={!loading && !input.trim()}
                onClick={loading ? stop : undefined}
                className="group flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500"
              >
                {!loading ? (
                  <svg
                    className="h-5 w-5 rotate-90 transition-transform duration-200 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.409l-7-14z" />
                  </svg>
                ) : (
                  <div className="relative">
                    <svg
                      className="h-5 w-5 transition-transform duration-200 hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="absolute inset-0 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
