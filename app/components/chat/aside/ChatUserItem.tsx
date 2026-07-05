"use client";

import Image from "next/image";
import { UserProfile } from "@/app/Contexts/type";

type Props = {
  user: UserProfile;
  unreadCount: number;
  onClick: () => void;
};

export default function ChatUserItem({ user, unreadCount, onClick }: Props) {
  if (!user.last_seen) return null;
  const isOnline = Date.now() - new Date(user.last_seen).getTime() < 60000;

  return (
    <div
      onClick={onClick}
      className="group relative flex items-center gap-3 hover:bg-linear-to-r hover:from-primary/10 hover:to-primary/5 px-3 py-2.5 border-2 border-transparent hover:border-primary/20 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
    >
      <div className="relative shrink-0">
        <div className="bg-linear-to-br from-primary/20 to-primary/5 shadow-sm group-hover:shadow-md rounded-full ring-2 ring-primary/10 group-hover:ring-primary/30 w-11 h-11 overflow-hidden transition-all duration-300">
          {user.avatar_url ? (
            <Image
              className="w-full h-full object-cover"
              width={44}
              height={44}
              src={user.avatar_url}
              alt={user.username}
            />
          ) : (
            <div className="flex justify-center items-center bg-linear-to-br from-primary/30 to-primary/10 w-full h-full font-bold text-primary text-sm">
              {user.username.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        {isOnline && (
          <div className="-right-0.5 -bottom-0.5 absolute bg-emerald-500 shadow-sm rounded-full ring-2 ring-background w-3.5 h-3.5 animate-pulse" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground/90 group-hover:text-primary text-sm truncate transition-colors duration-200">
          {user.username}
        </p>

        <p className="text-muted-foreground/60 text-xs truncate">
          {user.email || "عضو"}
        </p>
      </div>

      {unreadCount > 0 && (
        <div className="flex justify-center items-center bg-yellow-400 rounded-full min-w-5 h-5 text-white text-xs">
          {unreadCount}
        </div>
      )}
    </div>
  );
}
