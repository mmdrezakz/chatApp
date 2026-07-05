"use client";

import { useAuth } from "@/app/Contexts/AuthContent";
import { useChat } from "@/app/Contexts/ChatContext/ChatContext";
import { sendMessage, updateMessage } from "@/app/lib/supabase/messages";

import { useEffect, useRef, useState } from "react";

export default function InputMessage() {
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const { state, dispatch } = useChat();
  useEffect(() => {
    if (state.editingMessage) {
      setContent(state.editingMessage.content);
    }
  }, [state.editingMessage]);
  async function handleSubmitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!content.trim()) return;
    if (!user) return;
    if (!state.conversationId) return;
    if (state.editingMessage) {
      const updatedMessage = await updateMessage(
        state.editingMessage.id,
        content,
      );
      dispatch({
        type: "UPDATE_MESSAGE",
        payload: updatedMessage,
      });
      dispatch({
        type: "SET_EDITING_MESSAGE",
        payload: null,
      });
      setContent("");

      return;
    }
    await sendMessage(state.conversationId, user.id, content.trim());
    setContent("");
  }
  return (
    <form
      onSubmit={handleSubmitMessage}
      className="flex gap-2 p-4 border-border border-t shrink-0"
    >
      <div className="relative rounded-xl w-full">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="relative bg-card px-3 py-3 border border-border rounded-xl outline-none w-full"
          type="text"
          placeholder="پیام بنویس..."
        />
      </div>

      <button
        type="submit"
        className="bg-primary px-6 py-3 rounded-xl text-primary-foreground"
      >
        {state.editingMessage ? "ذخیره" : "ارسال"}
      </button>
    </form>
  );
}
