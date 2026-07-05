import React from "react";
import HeaderChat from "./headerChat";
import Message from "./Message";
import InputMessage from "./InputMessage";
import BackgroundWrapper from "../../register/backgroundWrapper";

export default function MainAreaChat() {
  return (
    <main className="flex flex-col flex-1 h-screen">
      <HeaderChat />

      <Message />
      <InputMessage />
    </main>
  );
}
