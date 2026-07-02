"use client";
import { useState } from "react";
import SettingIcon from "../../setting/SettingIcon";
import ChatsAside from "./ChatsAside";
import HeaderAside from "./HeaderAside";
import SettingAside from "../../setting/SettingAsideHeader";
import SettingAsideMain from "../../setting/SettingAsideMain";
import LogoutButton from "../../logout/LogOut";
import { useAuth } from "@/app/Contexts/AuthContent";

import { PanelRightOpen } from "lucide-react";
import CloseAside from "../../CloseAside/CloseAside";
import Button from "../../ui/Button";

export default function Aside() {
  const [ShowSetting, setShowSetting] = useState(false);
  const [showAside, setShowAside] = useState(false);
  const { logout } = useAuth();

  function handleShowSetting() {
    setShowSetting((s) => !s);
  }
  if (showAside) {
    return (
      <aside className="relative flex flex-col border-border border-l w-40 sm:w-56 md:w-64 lg:w-72 h-screen">
        {ShowSetting ? (
          <>
            <SettingAside />
            <div className="flex-1 overflow-y-auto">
              <SettingAsideMain />
              <div className="flex justify-center items-center">
                <LogoutButton onLogout={logout} />
                <CloseAside setShowAside={setShowAside} />
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
              <ChatsAside />
            </div>
            <div className="flex justify-center items-center">
              <LogoutButton onLogout={logout} />
              <CloseAside setShowAside={setShowAside} />
              <SettingIcon
                ShowSetting={ShowSetting}
                handleShowSetting={handleShowSetting}
              />
            </div>
          </>
        )}
      </aside>
    );
  } else {
    return (
      <Button
        onClick={() => setShowAside(true)}
        className="top-10 right-4 z-50 absolute hover:shadow-xl p-3 rounded-2xl hover:scale-110 transition-all -translate-y-1/2 cursor-pointer"
      >
        <PanelRightOpen />
      </Button>
    );
  }
}
