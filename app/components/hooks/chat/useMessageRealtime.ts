"use client";

import { useEffect } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { MessageType } from "@/app/Contexts/ChatContext/chatTypes";
import { useChat } from "@/app/Contexts/ChatContext/ChatContext";

export function useMessageRealtime(conversationId?: string | null) {
  const { dispatch } = useChat();

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          dispatch({
            type: "ADD_MESSAGE",
            payload: payload.new as MessageType,
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, dispatch]);
}
