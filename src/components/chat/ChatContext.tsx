"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ChatContextType {
  isOpen: boolean;
  toggleOpen: () => void;
  open: () => void;
  close: () => void;
}

const ChatContext = createContext<ChatContextType>({
  isOpen: false,
  toggleOpen: () => {},
  open: () => {},
  close: () => {},
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ChatContext.Provider value={{ isOpen, toggleOpen, open, close }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  return useContext(ChatContext);
}
