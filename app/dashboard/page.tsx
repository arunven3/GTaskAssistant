"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Badge } from "flowbite-react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    activeChats: 0,
    documentsUploaded: 0,
  });

  const quickActions = [
    {
      title: "Start New Chat",
      description: "Chat with AI assistant",
      icon: "💬",
      action: () => router.push("/chat"),
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Create Task",
      description: "Add a new task",
      icon: "📝",
      action: () => router.push("/chat"),
      color: "from-green-500 to-green-600",
    },
    {
      title: "Upload Document",
      description: "Add documents for AI search",
      icon: "📄",
      action: () => router.push("/admin/embeddings"),
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "View Calendar",
      description: "Check your schedule",
      icon: "📅",
      action: () => router.push("/chat"),
      color: "from-orange-500 to-orange-600",
    },
  ];

  const recentActivity = [
    {
      type: "chat",
      title: "Chat with AI Assistant",
      description: "Discussed project planning strategies",
      time: "2 hours ago",
      icon: "💬",
    },
    {
      type: "task",
      title: "Completed Task",
      description: "Reviewed quarterly reports",
      time: "1 day ago",
      icon: "✅",
    },
    {
      type: "document",
      title: "Document Uploaded",
      description: "Added project proposal.pdf",
      time: "2 days ago",
      icon: "📄",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back
                {session?.user?.name ? `, ${session.user.name}` : ""}!
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Here's what's happening with your tasks today.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge color="success" className="px-3 py-1">
                Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>

        <div className="mt-8">
          <Card className="border-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <span className="text-3xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Need Help?</h3>
                  <p className="text-indigo-100">
                    Chat with our AI assistant for task planning, research, and
                    more.
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-50"
                onClick={() => router.push("/chat")}
              >
                Start Chat
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
