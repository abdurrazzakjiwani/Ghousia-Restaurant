"use client";

import { useState, useCallback } from "react";
import { OrderIntentItem } from "@/types";

interface Message {
  role: "user" | "assistant";
  content: string;
  orderUrl?: string | null;
  orderItems?: OrderIntentItem[] | null;
  orderTotal?: number | null;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).slice(2)}`);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: content, history }),
      });

      const data = await res.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response || "Sorry, I couldn't process that.",
        orderUrl: data.orderUrl || null,
        orderItems: data.orderItems || null,
        orderTotal: data.orderTotal || null,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble right now. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, sendMessage, isLoading, clearMessages };
}
