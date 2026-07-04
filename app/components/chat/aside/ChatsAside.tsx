"use client";
import Image from "next/image";
import { UserProfile } from "@/app/Contexts/type";
import { useChat } from "@/app/Contexts/ChatContext/ChatContext";
import { useEffect } from "react";
import { useAuth } from "@/app/Contexts/AuthContent";
import { getAllUsers } from "@/app/lib/supabase/users";
import { openConversation } from "@/app/lib/supabase/conversations";
import { getMessages } from "@/app/lib/supabase/messages";

export default function ChatsAside({
  setShowAside,
}: {
  setShowAside: (s: boolean) => void;
}) {
  const { state, dispatch } = useChat();
  const { user } = useAuth();

  //GetAllUsers
  useEffect(() => {
    if (!user) return;
    const UserId = user.id;
    async function loadUsers() {
      const data = await getAllUsers(UserId);

      dispatch({ type: "SET_USERS", payload: data });
    }
    loadUsers();
  }, [user, dispatch]);
  //OpenChat
  const handleOpenChat = async (selectedUser: UserProfile) => {
    if (!user) return;
    setShowAside(false);
    dispatch({
      type: "SET_SELECTED_USER",
      payload: selectedUser,
    });

    const conversationId = await openConversation(user.id, selectedUser.id);

    dispatch({
      type: "SET_CONVERSATION",
      payload: conversationId,
    });
    const messages = await getMessages(conversationId);

    dispatch({
      type: "SET_MESSAGES",
      payload: messages,
    });
  };
  return (
    <div className="flex-1 space-y-1.5 px-2 py-2 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/30">
      {state.users.map((u) => (
        <div
          onClick={() => handleOpenChat(u)}
          key={u.id}
          className="group relative flex items-center gap-3 hover:bg-linear-to-r hover:from-primary/10 hover:to-primary/5 px-3 py-2.5 border-2 border-transparent hover:border-primary/20 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="bg-linear-to-br from-primary/20 to-primary/5 shadow-sm group-hover:shadow-md rounded-full ring-2 ring-primary/10 group-hover:ring-primary/30 w-11 h-11 overflow-hidden transition-all duration-300">
              {u.avatar_url ? (
                <Image
                  className="w-full h-full object-cover"
                  width={44}
                  height={44}
                  src={u.avatar_url}
                  alt={u.username}
                />
              ) : (
                <div className="flex justify-center items-center bg-linear-to-br from-primary/30 to-primary/10 w-full h-full font-bold text-primary text-sm">
                  {u.username.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            {/* Online Status */}
            <div className="-right-0.5 -bottom-0.5 absolute bg-emerald-500 shadow-sm rounded-full ring-2 ring-background w-3.5 h-3.5 animate-pulse"></div>
          </div>

          {/* Username */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground/90 group-hover:text-primary text-sm truncate transition-colors duration-200">
              {u.username}
            </p>
            <p className="text-muted-foreground/60 text-xs truncate">
              {u.email || "عضو"}
            </p>
          </div>

          {/* Unread Indicator */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
            <div className="bg-primary/40 group-hover:bg-primary shadow-sm rounded-full w-2 h-2 transition-colors duration-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
