"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/Contexts/AuthContent";
import { useChat } from "@/app/Contexts/ChatContext/ChatContext";
import { getAllUsers } from "@/app/lib/supabase/users";

export function useLoadUsers() {
  const { user } = useAuth();
  const { dispatch } = useChat();

  useEffect(() => {
    if (!user) return;
    const UserId = user.id;
    async function loadUsers() {
      const data = await getAllUsers(UserId);

      dispatch({
        type: "SET_USERS",
        payload: data,
      });
    }

    loadUsers();
  }, [user, dispatch]);
}
