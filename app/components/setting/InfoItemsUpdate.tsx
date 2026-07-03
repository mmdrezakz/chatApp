"use client";
import { useAuth } from "@/app/Contexts/AuthContent";
import InfoItem from "./InfoItem";
import { InfoItemsUpdateProps } from "./type";

export default function InfoItemsUpdate({
  setEditField,
  setEditValue,
}: InfoItemsUpdateProps) {
  const { user } = useAuth();
  const openEdit = (field: string) => {
    setEditField(field);

    setEditValue(String(user?.[field as keyof typeof user] ?? ""));
  };
  return (
    <>
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
    </>
  );
}
