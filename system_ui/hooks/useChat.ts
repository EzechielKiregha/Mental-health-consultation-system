"use client";
// This code is a custom React hook that fetches resources from an API endpoint.
import { useState, useEffect } from "react";
import api from "../lib/api";
import { useAuth } from "@/context/AuthContext";
import { ParamValue } from "next/dist/server/request/params";

interface Message {
  id: string;
  sender: string;
  messageText: string;
  sentAt: string;
}

export const useChat = (sessionId: ParamValue) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [chatSessions, setChatSessions] = useState<any[]>([])
  const [sendFrom, setSentFrom] = useState<sender>()
  const { user } = useAuth()

  const fetchMessages = async () => {
    try {
      const response = await api.get(`/chat/${sessionId}`);
      if (response.status === 404){
        setError("Fetch Error:"+response.data.message)
      }else
        setMessages(response.data);
      // if (user) userChatSessions(user.userId)
    } catch (err) {
      setError("Failed to fetch messages.");
    }
  };

  enum sender {
    "PATIENT",
    "THERAPIST"
  }

  const sendMessage = async (messageText: string) => {
    
    if(user && user.role.includes("PATIENT") && !user.role.includes("THERAPIST")){
      setSentFrom(sender.PATIENT)
    } else if(user && user.role.includes("THERAPIST")) {setSentFrom(sender.THERAPIST)}
    else{
      setError("Sorry You Can't Send Message")
    }
    try {
      await api.post(`/chat/${sessionId}`,{
        sender : sendFrom,
        text: messageText
      }
      );
    } catch (err) {
      setError("Failed to send message.");
    }
  };

  

  return {chatSessions, messages, sendMessage, error };
};
