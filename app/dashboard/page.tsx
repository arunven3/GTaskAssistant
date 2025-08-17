"use client";

import { Chat } from "@/app/components/chat-ui/chat";
import ProtectedRoute from "@/app/components/routes/ProtectedRoute";
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
