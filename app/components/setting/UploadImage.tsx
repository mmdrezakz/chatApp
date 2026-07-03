"use client";

import { useAuth } from "@/app/Contexts/AuthContent";
import { supabase } from "@/app/lib/supabase/client";
import { Pencil, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UploadImage() {
  const { user, refreshUser } = useAuth();
  const [uploading, setUploading] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !user) return;

    // اعتبارسنجی حجم
    if (file.size > 2 * 1024 * 1024) {
      toast.error("حجم عکس نباید بیشتر از 2 مگابایت باشد");
      return;
    }

    // اعتبارسنجی نوع فایل
    if (!file.type.startsWith("image/")) {
      toast.error("فقط فایل تصویری مجاز است");
      return;
    }

    try {
      setUploading(true);

      const extension = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${extension}`;

      // آپلود در استوریج
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // گرفتن URL عمومی
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      // آپدیت پروفایل
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          avatar_url: publicUrl,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      // رفرش کاربر
      await refreshUser();

      toast.success("عکس پروفایل بروزرسانی شد");
    } catch (error) {
      console.error(error);
      toast.error("خطا در آپلود عکس");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <label className="cursor-pointer">
        <div className="relative bg-foreground/10 rounded-full w-24 h-24 overflow-hidden">
          {/* نمایش آواتار یا حرف اول */}
          {user?.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt="avatar"
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <div className="flex justify-center items-center w-full h-full font-bold text-3xl">
              {user?.username?.charAt(0).toUpperCase() || "?"}
            </div>
          )}

          {/* لایه رویی با افکت hover */}
          <div className="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-white text-xs">
              {uploading ? (
                <div className="flex flex-col items-center gap-1">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>در حال آپلود...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Pencil className="w-3 h-3" />
                  <span>تغییر عکس</span>
                </div>
              )}
            </span>
          </div>

          {/* نمایش لودینگ روی خود تصویر  */}
          {uploading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          className="hidden"
          disabled={uploading} // غیرفعال کردن در حین آپلود
        />
      </label>
    </div>
  );
}
