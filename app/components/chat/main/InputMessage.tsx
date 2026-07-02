"use client";

import { Paperclip } from "lucide-react";
import React, { useRef } from "react";

export default function InputMessage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="flex gap-2 p-4 border-border border-t">
      <div className="relative rounded-xl w-full">
        <input
          className="relative bg-card px-3 py-3 border border-border rounded-xl outline-none w-full"
          type="text"
          placeholder="پیام بنویس..."
        />

        {/* اینپوت فایل مخفی */}
        <input ref={fileInputRef} type="file" className="hidden" />

        {/* با کلیک، اینپوت فایل رو صدا می‌زنه */}
        <Paperclip
          size={20}
          onClick={() => fileInputRef.current?.click()}
          className="top-1/2 left-0 absolute mx-4 -translate-y-1/2 cursor-pointer"
        />
      </div>

      <button
        type="submit"
        className="bg-primary px-6 py-3 rounded-xl text-primary-foreground"
      >
        ارسال
      </button>
    </form>
  );
}
