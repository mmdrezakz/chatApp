"use client";
import { createContext, useContext, useReducer } from "react";
import { ChatAction, ChatState } from "./chatTypes";
import { chatReducer, initialState } from "./chatReducer";
interface ChatContextType {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
}
const ChatContext = createContext<ChatContextType | null>(null);

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used inside ChatProvider");
  }
  return context;
}
