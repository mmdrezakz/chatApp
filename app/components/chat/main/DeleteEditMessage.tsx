import { Pencil, Trash } from "lucide-react";
import React from "react";

export default function DeleteEditMessage() {
  async function handleDelete(messageId: string) {
    await deleteMessage(messageId);
    dispatch({
      type: "DELETE_MESSAGE",
      payload: messageId,
    });
  }
  return (
    <>
      <Trash
        color="blue"
        className="cursor-pointer"
        size={15}
        onClick={() => handleDelete(message.id)}
      />

      <Pencil
        color="blue"
        className="cursor-pointer"
        size={15}
        onClick={() => {
          dispatch({
            type: "SET_EDITING_MESSAGE",
            payload: message,
          });
        }}
      />
    </>
  );
}
