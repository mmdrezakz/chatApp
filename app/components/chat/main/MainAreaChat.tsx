import React from "react";
import HeaderChat from "./headerChat";
import Message from "./Message";
import InputMessage from "./InputMessage";

export default function MainAreaChat() {
  return (
    <main className="flex flex-col flex-1">
      <HeaderChat />
      <Message />
      <InputMessage />
    </main>
  );
}
