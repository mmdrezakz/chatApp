"use client";

import { MessageType } from "@/app/Contexts/ChatContext/chatTypes";
import { Pencil, Trash } from "lucide-react";

type Props = {
  message: MessageType;
  isMine: boolean;
  onDelete: () => void;
  onEdit: () => void;
};

export default function MessageBubble({
  message,
  isMine,
  onDelete,
  onEdit,
}: Props) {
  if (isMine) {
    return (
      <div className="relative self-start bg-background shadow-md px-4 py-2 rounded-2xl max-w-xs">
        <div
          className="top-1/2 -right-2 absolute bg-background w-3 h-3 -translate-y-1/2"
          style={{
            clipPath: "polygon(0 0, 100% 50%, 0 100%)",
          }}
        />

        <p>{message.content}</p>

        <div className="relative flex justify-end items-center gap-1 mt-1">
          <div className="flex justify-between items-center gap-4">
            <div className="flex justify-center items-center gap-2">
              <Trash
                color="blue"
                className="cursor-pointer"
                size={15}
                onClick={onDelete}
              />

              <Pencil
                color="blue"
                className="cursor-pointer"
                size={15}
                onClick={onEdit}
              />
            </div>

            <div className="flex justify-center items-center gap-2">
              <span className="text-xs">
                {new Date(message.created_at).toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>

              <span
                className={`text-xs ${
                  message.isRead ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {message.isRead ? "✓✓" : "✓"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative self-end bg-message shadow-md px-4 py-2 rounded-2xl max-w-xs">
      <div
        className="top-1/2 -left-2 absolute bg-message w-3 h-3 rotate-180 -translate-y-1/2"
        style={{
          clipPath: "polygon(0 0, 100% 50%, 0 100%)",
        }}
      />

      <p>{message.content}</p>

      <div className="flex justify-end items-center gap-1 mt-1">
        <span className="text-xs">
          {new Date(message.created_at).toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
