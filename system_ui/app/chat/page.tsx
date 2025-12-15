"use client";

import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import ErrorMessage from "../../components/ErrorMessage";
import { ParamValue } from "next/dist/server/request/params";
import DLoader from "@/components/DataLoader";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  const { user } = useAuth();
  const [sessionId, setSessionId] = useState<ParamValue>();
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) userChatSessions(user.userId);
  }, [user]);

  const userChatSessions = async (userId: string) => {
    try {
      const res = await api.get(`/chat/get-sessions/${userId}`);
      setChatSessions(res.data);
    } catch (error) {
      console.log("[ERROR] : " + error);
      setError("Failed to fetch Chats: " + error);
    }
  };

  if (chatSessions.length == 0) return <DLoader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-green-800 mb-4 ">Chats</h1>
      <div className="bg-green-50 border border-green-600 rounded-lg p-4 mb-4 h-64 overflow-y-auto shadow-md">
        {chatSessions.length === 0 ? (
          <div className="text-center">
            <strong className="text-green-800">NO MESSAGE YET:</strong>
          </div>
        ) : (
          <div className="space-y-2">
            {chatSessions?.map((chat) => (
              <a
                key={chat?.id}
                href={`/chat/${chat?.id}`}
                className="block p-3 border rounded-lg bg-white hover:bg-gray-100 shadow-sm transition-all duration-200"
              >
                <div className="flex justify-between items-center">
                  <strong className="text-gray-800">To My Therapist:</strong>
                  <strong className="text-green-800">{chat?.therapist?.firstName} {chat?.therapist?.lastName}</strong>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="text-center mt-4">
        <a href="/therapists">
          <Button variant="link" className="cursor-pointer text-green-800 hover:underline">
            Here Are Therapist
          </Button>
        </a>
      </div>
    </div>
  );
}
