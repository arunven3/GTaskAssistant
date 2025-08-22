"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [tool, setTool] = useState("llm");
  const [response, setResponse] = useState("");

  async function sendMessage() {
    setResponse("...");
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, tool }),
    });
    const data = await res.json();
    setResponse(data.response);
  }

  return (
    <div className="mx-auto max-w-xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">AI + Google Tools</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        className="w-full rounded border p-2"
      />

      <div className="flex space-x-2">
        <select
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          className="rounded border p-2"
        >
          <option value="llm">💬 LLM</option>
          <option value="calendar">📅 Google Calendar</option>
          <option value="gmail">📧 Gmail</option>
        </select>
        <button
          onClick={sendMessage}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Send
        </button>
      </div>

      <div className="rounded border bg-gray-50 p-4">
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}
