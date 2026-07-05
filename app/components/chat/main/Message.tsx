"use client";
import { useAuth } from "@/app/Contexts/AuthContent";
import { useChat } from "@/app/Contexts/ChatContext/ChatContext";
import { deleteMessage } from "@/app/lib/supabase/messages";
import { LoaderCircle, Pencil, Trash } from "lucide-react";
import ConfirmModal from "../../ui/ConfirmModal";
import { useRef, useState } from "react";

import { useMessageRealtime } from "../../hooks/chat/useMessageRealtime";
import { useMessageScroll } from "../../hooks/chat/useMessageScroll";
import MessageBubble from "./MessageBubble";

export default function Message() {
  const { state, dispatch } = useChat();
  const { user } = useAuth();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useMessageRealtime(state.conversationId);
  useMessageScroll(bottomRef, state.messages);

  async function handleDelete(messageId: string) {
    await deleteMessage(messageId);
    dispatch({
      type: "DELETE_MESSAGE",
      payload: messageId,
    });
  }

  if (state.loadingMessages) {
    return (
      <section className="flex flex-1 justify-center items-center gap-2 bg-card/80 min-h-0">
        <div className="animate-spin">
          <LoaderCircle className="text-blue-500" size={60} />
        </div>
        <p>لطفا منتظر بمانید .</p>
      </section>
    );
  }
  if (!state.selectedUser) {
    return (
      <section className="flex flex-1 justify-center items-center bg-card/80 min-h-0">
        یک گفتگو انتخاب کنید
      </section>
    );
  }

  return (
    <>
      <section className="flex flex-col flex-1 gap-3 bg-card/80 p-4 min-h-0 overflow-y-auto scrollbar-custom">
        {state.messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isMine={message.sender_id === user?.id}
            onDelete={() => setDeleteId(message.id)}
            onEdit={() =>
              dispatch({
                type: "SET_EDITING_MESSAGE",
                payload: message,
              })
            }
          />
        ))}
        <div ref={bottomRef} />
        <ConfirmModal
          open={!!deleteId}
          title="حذف پیام"
          description="آیا از حذف این پیام مطمئن هستید؟"
          onCancel={() => setDeleteId(null)}
          onConfirm={async () => {
            if (!deleteId) return;

            await handleDelete(deleteId);

            setDeleteId(null);
          }}
        />
      </section>
    </>
  );
}
