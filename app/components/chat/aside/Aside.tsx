"use client";
import { useState } from "react";
import SettingIcon from "../../setting/SettingIcon";
import ChatsAside from "./ChatsAside";
import HeaderAside from "./HeaderAside";
import SettingAside from "../../setting/SettingAsideHeader";
import SettingAsideMain from "../../setting/SettingAsideMain";

export default function Aside() {
  const [ShowSetting, setShowSetting] = useState(false);

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
        </>
      )}
      <SettingIcon
        ShowSetting={ShowSetting}
        handleShowSetting={handleShowSetting}
      />
    </aside>
  );
}
