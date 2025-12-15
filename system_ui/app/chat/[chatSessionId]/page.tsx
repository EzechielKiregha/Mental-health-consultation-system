"use client";

import React, { useState, useEffect, use } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import ErrorMessage from "@/components/ErrorMessage";
import { useAuth } from "@/context/AuthContext";
import DLoader from "@/components/DataLoader";
import { ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  messageText: string;
  sentAt: string;
}

export default function ChatSessionPage() {
  const { chatSessionId } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nodMsg, setNoMsg] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth()

  useEffect(() => {
    if (!chatSessionId) {
      setError("Chat session ID is required.");
      setLoading(false);
      return;
    }
    fetchMessages();
    const interval = setInterval(fetchMessages, 120000); // Changed from 3000ms (3 seconds) to 120000ms (2 minutes)
    return () => clearInterval(interval);
  }, [chatSessionId]);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/chat/${chatSessionId}`);
      if (response.status === 404) {
        setLoading(false)
        console.log("Error Fetching chat messages:" + response.status)
        setError("Fetch Error:" + response.data.message)
      } else
        setMessages(response.data);
    } catch (err) {
      setError("Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        const res = await api.post(`/chat/${chatSessionId}/message`, null, {
          params: {
            sender: `${user && user.role.includes("PATIENT") && !user.role.includes("THERAPIST") ? "PATIENT" : "THERAPIST"}`,
            text: message
          }
        }
        );
        setLoading(false)
        setMessage("");
        fetchMessages();
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <DLoader message="Loading page…" />
      </div>
    );
  }
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <span className="text-gray-600 mb-4">
        <ArrowLeft className="inline mr-2" />
        <a href="/chat" className="text-green-600 hover:underline">
          Back to chat list
        </a>
      </span>
      <h1 className="text-2xl font-bold text-green-800 mb-4">Chat Session</h1>
      <div className="bg-green-50 border border-green-600 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
        {nodMsg?.length !== 0 && messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <strong className="text-green-800">{msg.sender}:</strong>{" "}
            <span className="text-gray-800">{msg.messageText}</span>
          </div>
        ))}
      </div>
      {/* {nodMsg && (
        <div className="bg-green-50 border border-green-600 rounded-lg p-4 mb-4">
          <strong className="text-green-800">{nodMsg}</strong>
        </div>
      )} */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded focus:border-green-600 focus:ring-1 focus:ring-green-600"
          placeholder="Type a message..."
        />
        <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
}
