"use client";
import ChatUserItem from "./ChatUserItem";
import Image from "next/image";
import { UserProfile } from "@/app/Contexts/type";
import { useChat } from "@/app/Contexts/ChatContext/ChatContext";
import { useState } from "react";
import { useAuth } from "@/app/Contexts/AuthContent";

import { openConversation } from "@/app/lib/supabase/conversations";

import { getMessages } from "@/app/lib/supabase/messages";

import toast from "react-hot-toast";
import { useLoadUsers } from "../../hooks/chat/useLoadUsers";
import { useOnlineUsers } from "../../hooks/chat/useOnlineUsers";
import { useUnreadMessages } from "../../hooks/chat/useUnreadMessages";
import { markMessagesAsRead } from "@/app/lib/supabase/messageReads";

export default function ChatsAside({
  setShowAside,
}: {
  setShowAside: (s: boolean) => void;
}) {
  const { state, dispatch } = useChat();
  const { user } = useAuth();
  const [openingChat, setOpeningChat] = useState(false);
  useLoadUsers();
  useOnlineUsers();
  useUnreadMessages();
  //OpenChat
  const handleOpenChat = async (selectedUser: UserProfile) => {
    if (!user || openingChat) return;
    setOpeningChat(true);
    setShowAside(false);
    dispatch({
      type: "SET_SELECTED_USER",
      payload: selectedUser,
    });

    dispatch({
      type: "SET_LOADING_MESSAGES",
      payload: true,
    });

    dispatch({
      type: "SET_MESSAGES",
      payload: [],
    });

    try {
      const conversationId = await openConversation(user.id, selectedUser.id);

      dispatch({
        type: "SET_CONVERSATION",
        payload: conversationId,
      });

      const messages = await getMessages(conversationId);
      await markMessagesAsRead(conversationId, user.id);
      dispatch({
        type: "SET_MESSAGES",
        payload: messages,
      });
      await markMessagesAsRead(conversationId, user.id);
      dispatch({
        type: "CLEAR_UNREAD",
        payload: selectedUser.id,
      });
    } catch (error: any) {
      console.error("Open chat failed:", error);
      toast.error("خطا در باز کردن گفتگو");
    } finally {
      dispatch({
        type: "SET_LOADING_MESSAGES",
        payload: false,
      });
      setOpeningChat(false);
    }
  };
  return (
    <div className="flex-1 space-y-1.5 px-2 py-2 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/30">
      {state.users.map((u) => {
        if (!u.last_seen) return null;

        const unreadCount = state.unreadCounts[u.id] || 0;

        return (
          <ChatUserItem
            key={u.id}
            user={u}
            unreadCount={unreadCount}
            onClick={() => handleOpenChat(u)}
          />
        );
      })}
    </div>
  );
}
