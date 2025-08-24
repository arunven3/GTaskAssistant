"use client";

import { Chat } from "@/components/chat-ui/chat";
import ProtectedRoute from "@/components/routes/ProtectedRoute";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <>
      <SessionProvider>
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      </SessionProvider>
    </>
  );
}
