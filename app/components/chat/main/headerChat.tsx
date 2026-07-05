"use client";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import Button from "../../ui/Button";
import ModalProfile from "./ModalProfile";
import { UserProfile } from "./type";
import { useChat } from "@/app/Contexts/ChatContext/ChatContext";
import Image from "next/image";

const userProfile: UserProfile = {
  name: "علی",
  username: "Ali_Reza",
  phone: "09921499833",
  email: "ali@example.com",
  status: "online",
  bio: "توسعه‌دهنده Frontend | عاشق React و Next.js",
  joinDate: "فروردین ۱۴۰۴",
  location: "تهران، ایران",
};

export default function HeaderChat() {
  const { state } = useChat();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!state.selectedUser) {
    return null;
  }
  return (
    <>
      <form
        onClick={() => setIsModalOpen(true)}
        className="group relative cursor-pointer"
      >
        <div className="flex justify-start items-center gap-3 mr-15 sm:mr-20 py-5 w-fit">
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
            <div className="-right-0.5 -bottom-0.5 absolute bg-emerald-500 shadow-sm rounded-full ring-2 ring-background w-3.5 h-3.5 animate-pulse"></div>
          </div>

          <h3 className="flex justify-center items-center bg-card px-4 py-1 rounded-2xl font-semibold">
            <span className="w-full h-full">
              {state.selectedUser?.username}
            </span>
          </h3>
        </div>
        <Button
          className="top-1/2 left-5 absolute -translate-y-1/2"
          type="button"
        >
          <ChevronLeft />
        </Button>
      </form>
      {isModalOpen && (
        <ModalProfile
          user={userProfile}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
