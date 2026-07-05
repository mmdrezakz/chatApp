"use client";

import { useEffect } from "react";
import { useChat } from "@/app/Contexts/ChatContext/ChatContext";
import { UserProfile } from "@/app/Contexts/type";
import { supabase } from "@/app/lib/supabase/client";

export function useOnlineUsers() {
  const { dispatch } = useChat();

  useEffect(() => {
    const channel = supabase
      .channel("profiles-status")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
        },
        (payload) => {
          dispatch({
            type: "UPDATE_USER",
            payload: payload.new as UserProfile,
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [dispatch]);
}
