"use client";
import { useState } from "react";
import Aside from "./components/chat/aside/Aside";
import MainAreaChat from "./components/chat/main/MainAreaChat";
import Button from "./components/ui/Button";
import { PanelRightOpen } from "lucide-react";
import BackgroundWrapper from "./components/register/backgroundWrapper";

export default function Page() {
  const [showAside, setShowAside] = useState(true);

  return (
    <BackgroundWrapper>
      <div className="relative flex h-screen">
        {/* Aside - در موبایل با شرط، در دسکتاپ همیشه */}
        <div
          className={`
          ${showAside ? "block" : "hidden"} 
          sm:block
          absolute sm:relative
          z-20 sm:z-auto
          w-full sm:w-auto
          h-full
          bg-background
          `}
        >
          <Aside />
        </div>

        {/* MainAreaChat - همیشه نمایش داده میشه */}
        <div className="flex-1 min-w-0">
          <MainAreaChat />
        </div>

        {/* دکمه باز کردن Aside - فقط در موبایل و وقتی Aside بسته است */}
        {!showAside && (
          <Button
            onClick={() => setShowAside(true)}
            className="sm:hidden top-10 right-4 z-30 absolute hover:shadow-xl px-2 py-1 hover:scale-110 transition-all -translate-y-1/2 cursor-pointer"
          >
            <PanelRightOpen />
          </Button>
        )}
      </div>
    </BackgroundWrapper>
  );
}
