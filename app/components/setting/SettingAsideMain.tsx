"use client";

import { useAuth } from "@/app/Contexts/AuthContent";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import toast from "react-hot-toast";
import Image from "next/image";
import InfoItem from "./InfoItem";
import Button from "../ui/Button";
import LoadingForm from "../ui/loading/LoadingForm";
import { Pencil, X } from "lucide-react";

export default function SettingAsideMain() {
  const { user, refreshUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  const closeModal = () => {
    setEditField("");
    setEditValue("");
  };
  const openEdit = (field: string) => {
    setEditField(field);

    setEditValue(String(user?.[field as keyof typeof user] ?? ""));
  };
  const handleUpdate = async () => {
    setEditLoading(true);

    if (!user) {
      setEditLoading(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        [editField]: editValue,
      })
      .eq("id", user.id);

    if (error) {
      toast.error(error.message);
      setEditLoading(false);

      return;
    }

    await refreshUser();

    setEditField("");
    setEditValue("");
    setEditLoading(false);

    toast.success("اطلاعات بروزرسانی شد");
  };
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !user) return;

    try {
      setUploading(true);

      const extension = file.name.split(".").pop();

      const fileName = `${user.id}-${Date.now()}.${extension}`;
      if (file.size > 2 * 1024 * 1024) {
        toast.error("حجم عکس نباید بیشتر از 2 مگابایت باشد");

        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("فقط فایل تصویری مجاز است");

        return;
      }
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          avatar_url: publicUrl,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

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
    <section className="space-y-6 p-6 overflow-y-auto scrollbar-custom">
      <div className="flex justify-center">
        <label className="cursor-pointer">
          <div className="relative bg-foreground/10 rounded-full w-24 h-24 overflow-hidden">
            {user?.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt="avatar"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex justify-center items-center w-full h-full font-bold text-3xl">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white text-xs">
                {uploading ? (
                  "..."
                ) : (
                  <div className="flex justify-center items-center text-xs">
                    <span className="text-xs">تغییر عکس</span> <Pencil />
                  </div>
                )}
              </span>
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </label>
      </div>
      <div className="space-y-3">
        <InfoItem
          onClick={() => openEdit("username")}
          label="نام کاربری"
          value={user?.username}
        />

        <InfoItem label="ایمیل" value={user?.email} />
        <InfoItem
          onClick={() => openEdit("full_name")}
          label="نام کامل"
          value={user?.full_name}
        />
        <InfoItem
          onClick={() => openEdit("phone")}
          label="شماره تماس"
          value={user?.phone}
        />
        <InfoItem
          onClick={() => openEdit("bio")}
          label="بیوگرافی"
          value={user?.bio || "ثبت نشده"}
        />
        <InfoItem
          label="تاریخ عضویت"
          value={
            user?.created_at
              ? new Date(user.created_at).toLocaleDateString("fa-IR")
              : "-"
          }
        />
        {editField && (
          <div
            onClick={closeModal}
            className="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-card p-5 rounded-xl w-80"
            >
              <button onClick={closeModal} className="items-center rounded-sm">
                <X />
              </button>
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="p-2 border rounded w-full"
              />
              {editLoading ? (
                <LoadingForm />
              ) : (
                <Button
                  onClick={handleUpdate}
                  className="mt-3 p-2 rounded w-full"
                >
                  ذخیره
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
