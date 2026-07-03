"use client";
import { useState } from "react";
import SettingIcon from "../../setting/SettingIcon";
import ChatsAside from "./ChatsAside";
import HeaderAside from "./HeaderAside";
import SettingAside from "../../setting/SettingAsideHeader";
import SettingAsideMain from "../../setting/SettingAsideMain";
import LogoutButton from "../../logout/LogOut";
import { useAuth } from "@/app/Contexts/AuthContent";

export default function Aside({
  setShowAside,
}: {
  setShowAside: (s: boolean) => void;
}) {
  const [ShowSetting, setShowSetting] = useState(false);
  const { logout } = useAuth();

  function handleShowSetting() {
    setShowSetting((s) => !s);
  }

  return (
    <aside className="flex flex-col border-border border-l w-full sm:w-80 h-full">
      {ShowSetting ? (
        <>
          <SettingAside />
          <div className="flex-1 overflow-y-auto">
            <SettingAsideMain />
            <div className="flex justify-center items-center gap-2 p-2">
              <LogoutButton onLogout={logout} />

              <SettingIcon
                ShowSetting={ShowSetting}
                handleShowSetting={handleShowSetting}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <HeaderAside />
          <div className="flex-1 overflow-y-auto">
            <ChatsAside setShowAside={setShowAside} />
          </div>
          <div className="flex justify-center items-center gap-2 p-2">
            <LogoutButton onLogout={logout} />
            <SettingIcon
              ShowSetting={ShowSetting}
              handleShowSetting={handleShowSetting}
            />
          </div>
        </>
      )}
    </aside>
  );
}
