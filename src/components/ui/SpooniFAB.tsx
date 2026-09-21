"use client";

import { Bot } from "lucide-react";
import { motion } from "motion/react";
import { useChatContext } from "@/components/chat/ChatContext";

export default function SpooniFAB() {
  const { toggleOpen } = useChatContext();

  return (
    <motion.button
      onClick={toggleOpen}
      className="fixed bottom-6 right-6 z-50 bg-linear-to-r from-gradient-start to-gradient-end text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Chat with Ghousia Assistant"
      title="Chat with Ghousia Assistant"
    >
      <Bot className="w-6 h-6 sm:w-7 sm:h-7" />
    </motion.button>
  );
}
