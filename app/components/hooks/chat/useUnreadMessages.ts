"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/Contexts/AuthContent";
import { useChat } from "@/app/Contexts/ChatContext/ChatContext";
import { MessageType } from "@/app/Contexts/ChatContext/chatTypes";
import { supabase } from "@/app/lib/supabase/client";
import { getUnreadCounts } from "@/app/lib/supabase/unreads";

export function useUnreadMessages() {
  const { user } = useAuth();
  const { dispatch } = useChat();

  useEffect(() => {
    if (!user) return;
    const UserId = user?.id;
    async function loadUnreadCounts() {
      try {
        const counts = await getUnreadCounts(UserId);

        dispatch({
          type: "SET_UNREAD_COUNTS",
          payload: counts,
        });
      } catch (error: any) {
        console.error("Load unread counts failed:", error);
      }
    }

    loadUnreadCounts();
    const channel = supabase
      .channel("unread-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const message = payload.new as MessageType;

          if (message.sender_id === user.id) return;

          dispatch({
            type: "INCREMENT_UNREAD",
            payload: message.sender_id,
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, dispatch]);
}
