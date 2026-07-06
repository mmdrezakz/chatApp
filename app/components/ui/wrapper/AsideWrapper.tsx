import Image from "next/image";
import { AsideWrapperProps } from "./type";
import { useAuth } from "@/app/Contexts/AuthContent";

export default function AsideWrapper({
  children,
  text,
  className = "",
  logo = "",
}: AsideWrapperProps) {
  const { user } = useAuth();
  return (
    <header
      className={`${className ? className : " flex justify-start items-center  gap-4"}  px-4 py-5 border-border border-b `}
    >
      <div className="rounded-full w-10 h-10 overflow-hidden">
        {user?.avatar_url ? (
          <Image
            width={48}
            height={48}
            src={user.avatar_url}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex justify-center items-center bg-foreground/10 w-full h-full font-bold">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-2">
        {logo}
        <h2 className="font-bold text-lg">{text}</h2>
      </div>
      {children}
    </header>
  );
}
