"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import { ChatAction, ChatState } from "./chatTypes";
import { chatReducer, initialState } from "./chatReducer";
import { useAuth } from "../AuthContent";
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
  const { user } = useAuth();

  //ریست کردن برای این که کاربران دیگر به چت هم دسترسی نداشته باشند
  useEffect(() => {
    if (!user) {
      dispatch({
        type: "RESET_CHAT",
      });
    }
  }, [user]);
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
