"use client";
import { useState } from "react";
import SettingIcon from "../../setting/SettingIcon";
import ChatsAside from "./ChatsAside";
import HeaderAside from "./HeaderAside";
import SettingAside from "../../setting/SettingAsideHeader";
import SettingAsideMain from "../../setting/SettingAsideMain";
import LogoutButton from "../../logout/LogOut";
import { useAuth } from "@/app/Contexts/AuthContent";

export default function Aside() {
  const [ShowSetting, setShowSetting] = useState(false);
  const { logout } = useAuth();

  function handleShowSetting() {
    setShowSetting((s) => !s);
  }
  return (
    <aside className="relative flex flex-col border-border border-l w-80">
      {ShowSetting ? (
        <>
          <SettingAside />
          <SettingAsideMain />
        </>
      ) : (
        <>
          <HeaderAside />
          <ChatsAside />
          <LogoutButton onLogout={logout} />
        </>
      )}
      <SettingIcon
        ShowSetting={ShowSetting}
        handleShowSetting={handleShowSetting}
      />
    </aside>
  );
}
