"use client";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import ModalProfile from "./ModalProfile";

import { useChat } from "@/app/Contexts/ChatContext/ChatContext";
import Image from "next/image";
import { supabase } from "@/app/lib/supabase/client";
import { UserProfile } from "@/app/Contexts/type";
export default function HeaderChat() {
  const { state, dispatch } = useChat();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (!state.selectedUser) return;

    const channel = supabase
      .channel("profile-status")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${state.selectedUser.id}`,
        },
        (payload) => {
          dispatch({
            type: "SET_SELECTED_USER",
            payload: payload.new as UserProfile,
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [state.selectedUser?.id]);
  if (!state.selectedUser) {
    return null;
  }

  return (
    <>
      <form
        onClick={() => setIsModalOpen(true)}
        className="group relative cursor-pointer"
      >
        <div className="flex justify-start items-center gap-3 mx-14 sm:mr-5 py-5 w-fit">
          {/* Avatar with Online Status */}
          <div className="relative shrink-0">
            <div className="bg-linear-to-br from-primary/20 to-primary/5 shadow-sm group-hover:shadow-md rounded-full ring-2 ring-primary/10 group-hover:ring-primary/30 w-11 h-11 overflow-hidden transition-all duration-300">
              {state?.selectedUser?.avatar_url ? (
                <Image
                  className="w-full h-full object-cover"
                  width={44}
                  height={44}
                  src={state.selectedUser.avatar_url}
                  alt={state.selectedUser.username}
                />
              ) : (
                <div className="flex justify-center items-center bg-linear-to-br from-primary/30 to-primary/10 w-full h-full font-bold text-primary text-sm">
                  {state?.selectedUser?.username.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            {/* Online Status Indicator on Avatar */}
          </div>
          <div className="gap-2 sm:gap-3 grid grid-cols-1 md:grid-cols-2">
            <h3 className="flex justify-center items-center bg-card px-2 sm:px-4 py-1 sm:py-2 md:py-1.5 rounded-2xl font-semibold text-xs sm:text-sm md:text-base">
              <span className="w-full max-w-30 xs:max-w-[160px] sm:max-w-none text-center truncate">
                {state.selectedUser?.username}
              </span>
            </h3>
            <div className="text-[8px] text-muted-foreground xs:text-[10px] sm:text-xs">
              {state.selectedUser.is_online ? (
                <div className="flex justify-center items-center gap-1 xs:gap-1.5 sm:gap-2 bg-card/80 px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-2xl">
                  <div className="bg-emerald-500 shadow-sm rounded-full ring-2 ring-background w-2 xs:w-2.5 sm:w-3.5 h-2 xs:h-2.5 sm:h-3.5 animate-pulse"></div>
                  <span className="text-[10px] xs:text-xs sm:text-sm">
                    آنلاین
                  </span>
                </div>
              ) : (
                <div className="flex flex-wrap justify-center items-center gap-0.5 xs:gap-1 sm:gap-2 bg-card/80 px-1.5 xs:px-2 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-2xl h-full">
                  <p className="text-[8px] xs:text-[10px] sm:text-xs whitespace-nowrap">
                    آخرین بازدید :
                  </p>
                  <span className="text-[8px] xs:text-[10px] sm:text-xs text-center">
                    {new Date(
                      state.selectedUser?.last_seen || "",
                    ).toLocaleString("fa-IR")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button
          className="top-1/2 left-5 absolute -translate-y-1/2"
          type="button"
        >
          <ChevronLeft />
        </Button>
      </form>
      {isModalOpen && <ModalProfile onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
