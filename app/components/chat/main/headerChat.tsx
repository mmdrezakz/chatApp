"use client";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import Button from "../../ui/Button";
import ModalProfile from "./ModalProfile";
import { UserProfile } from "./type";
import AsideWrapper from "../../ui/wrapper/AsideWrapper";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <form
        onClick={() => setIsModalOpen(true)}
        className="relative cursor-pointer"
      >
        <AsideWrapper
          className={"flex justify-start  items-center gap-3 relative "}
          text=""
        >
          <div className="flex justify-center items-center gap-3 mr-15 sm:mr-20">
            <div className="flex justify-center items-center bg-background/50 shadow-shadow shadow-sm rounded-full w-10 h-10 font-bold text-سئ">
              عکس
            </div>
            <h3 className="font-semibold">علی</h3>
            <span className="text-green-500 text-sm">آنلاین</span>
          </div>
          <Button className="left-5 absolute" type="button">
            <ChevronLeft />
          </Button>
        </AsideWrapper>
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
