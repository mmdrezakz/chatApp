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
import ChatUserSkeleton from "./ChatUserSkeleton";

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
      //1
      const cachedConversationId = state.conversationCache[selectedUser.id];
      const conversationId =
        cachedConversationId ??
        (await openConversation(user.id, selectedUser.id));
      if (!cachedConversationId) {
        dispatch({
          type: "CACHE_CONVERSATION",
          payload: {
            userId: selectedUser.id,
            conversationId,
          },
        });
      }
      const cachedMessages = state.messageCache[conversationId];
      dispatch({
        type: "SET_CONVERSATION",
        payload: conversationId,
      });

      //2
      //گرفتن از کش
      if (cachedMessages) {
        dispatch({
          type: "SET_MESSAGES",
          payload: cachedMessages,
        });
      }

      const messages = await getMessages(conversationId);

      dispatch({
        type: "SET_MESSAGES",
        payload: messages,
      });

      dispatch({
        type: "CACHE_MESSAGES",
        payload: {
          conversationId,
          messages,
        },
      });
      //awaitرا برداشتم تا زود تر لود شود مسیج ها
      markMessagesAsRead(conversationId, user.id).catch(console.error);

      // });
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
  if (state.loadingUsers) {
    return (
      <div className="flex-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <ChatUserSkeleton key={i} />
        ))}
      </div>
    );
  }
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
