"use client";

import { useAuth } from "@/app/Contexts/AuthContent";

export default function SettingAsideMain() {
  const { user } = useAuth();

  return (
    <section className="space-y-6 p-6 overflow-y-auto scrollbar-custom">
      <div className="flex flex-col items-center gap-3">
        <div className="flex justify-center items-center bg-foreground/10 rounded-full w-24 h-24 font-bold text-3xl">
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        <h2 className="font-bold text-xl">{user?.username}</h2>
      </div>

      <div className="space-y-3">
        <InfoItem label="ایمیل" value={user?.email} />
        <InfoItem label="نام کامل" value={user?.full_name} />
        <InfoItem label="شماره تماس" value={user?.phone} />
        <InfoItem label="بیوگرافی" value={user?.bio || "ثبت نشده"} />
        <InfoItem
          label="تاریخ عضویت"
          value={
            user?.created_at
              ? new Date(user.created_at).toLocaleDateString("fa-IR")
              : "-"
          }
        />
      </div>
    </section>
  );
}

function InfoItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="bg-card shadow-sm p-3 border border-border rounded-xl">
      <p className="mb-1 text-muted-foreground text-xs">{label}</p>
      <p className="font-medium break-all">{value || "-"}</p>
    </div>
  );
}
