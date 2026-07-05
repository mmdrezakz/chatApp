import { Calendar, Mail, MapPin, Phone, User, X } from "lucide-react";
import { UserProfile } from "./type";
import Button from "../../ui/Button";
import { toPersianNumber } from "@/app/lib/supabase/Persion/numberUtils";
import { useChat } from "@/app/Contexts/ChatContext/ChatContext";
import Image from "next/image";

export default function ModalProfile({
  user,
  onClose,
}: {
  user: UserProfile;
  onClose: () => void;
}) {
  const { state } = useChat();
  return (
    <div
      className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-card shadow-2xl mx-4 p-6 rounded-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* دکمه بستن */}
        <Button onClick={onClose}>
          <X size={24} />
        </Button>

        {/* محتوای پروفایل */}
        <div className="text-center">
          {/* آواتار */}
          <div className="flex justify-center items-center bg-background/50 shadow-shadow shadow-sm mx-auto rounded-full w-24 h-24 overflow-hidden font-bold text-3xl">
            {state?.selectedUser?.avatar_url ? (
              <Image
                className="w-full h-full object-cover"
                width={200}
                height={200}
                src={state.selectedUser.avatar_url}
                alt={state.selectedUser.username}
              />
            ) : (
              <div className="flex justify-center items-center bg-linear-to-br from-primary/30 to-primary/10 w-full h-full font-bold text-primary text-sm">
                {state?.selectedUser?.username.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <h2 className="mt-4 font-bold text-2xl">
            {state.selectedUser?.full_name}
          </h2>
          <span className="text-gray-400 text-sm">
            {state.selectedUser?.username} @
          </span>

          {/* وضعیت */}
          <div className="mt-2">
            <span
              className={`
              inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm
              ${user.status === "online" ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-400"}
            `}
            >
              <span
                className={`w-2 h-2 rounded-full ${user.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
              />
              {user.status === "online" ? "آنلاین" : "آفلاین"}
            </span>
          </div>

          {/* بیوگرافی */}
          <p className="mt-3 px-2 text-sm">{state.selectedUser?.bio}</p>

          <div className="my-4 divider" />

          {/* اطلاعات */}
          <div className="space-y-3 text-right">
            <div className="flex items-center gap-3">
              <User size={18} className="" />
              <span className="text-sm">{state.selectedUser?.full_name}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="" />
              <span className="text-sm">
                {toPersianNumber(state.selectedUser?.phone || "")}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="" />
              <span className="text-sm">{state.selectedUser?.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-gray-400" />
              <span className="text-sm">عضویت از {user.joinDate}</span>
            </div>
          </div>

          {/* دکمه‌ها */}
          <div className="flex gap-3 mt-6">
            <Button className="flex-1 py-2">پیام</Button>
            <Button className="flex-1 py-2">تماس</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
