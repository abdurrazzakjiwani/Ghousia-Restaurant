"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, ArrowDown } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import ChatMessage from "./ChatMessage";
import { motion, AnimatePresence } from "framer-motion";
import { slideUp } from "@/lib/animations";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, isLoading } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);

  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const { scrollHeight, scrollTop, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    setIsNearBottom(distanceFromBottom < 100);
  }, []);

  useEffect(() => {
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isNearBottom]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideUp}
          >
            <div className="bg-gradient-to-r from-gradient-start to-gradient-end text-white px-4 py-3 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm">Ghousia Assistant</h3>
                <p className="text-xs text-white/80">Ask about our menu or place an order</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 space-y-3 h-80 chat-scroll relative"
            >
              {messages.length === 0 && (
                <div className="text-center text-gray-400 text-sm py-8">
                  <p className="mb-2">Welcome! How can I help you?</p>
                  <p>Try: &ldquo;What do you recommend?&rdquo;</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <ChatMessage
                  key={i}
                  role={msg.role}
                  content={msg.content}
                  orderUrl={msg.orderUrl}
                  orderItems={msg.orderItems}
                  orderTotal={msg.orderTotal}
                />
              ))}
              {isLoading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
              <AnimatePresence>
                {!isNearBottom && (
                  <motion.button
                    onClick={scrollToBottom}
                    className="sticky bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end text-white flex items-center justify-center shadow-lg mx-auto"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Scroll to bottom"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gradient-start"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="w-9 h-9 rounded-lg bg-gradient-to-r from-gradient-start to-gradient-end text-white flex items-center justify-center disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end text-white flex items-center justify-center shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
