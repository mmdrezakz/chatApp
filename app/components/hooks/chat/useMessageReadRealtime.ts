"use client";

import { useEffect } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useChat } from "@/app/Contexts/ChatContext/ChatContext";
import { useAuth } from "@/app/Contexts/AuthContent";

export function useMessageReadRealtime() {
  const { state, dispatch } = useChat();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("message-reads")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "message_reads",
        },
        (payload) => {
          //Tostring?
          const messageId = payload.new.message_id;
          const readerId = payload.new.user_id;
          const message = state.messages.find((m) => m.id === messageId);
          if (!message) return;
          if (readerId === message.sender_id) return;
          dispatch({
            type: "MARK_MESSAGE_READ",
            payload: payload.new.message_id,
          });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [dispatch, state.messages, user]);
}
