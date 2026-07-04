import { useAuth } from "@/app/Contexts/AuthContent";
import { useChat } from "@/app/Contexts/ChatContext/ChatContext";

export default function Message() {
  const { state } = useChat();
  const { user } = useAuth();
  if (!state.selectedUser) {
    return (
      <section className="flex flex-1 justify-center items-center bg-card/80">
        یک گفتگو انتخاب کنید
      </section>
    );
  }

  return (
    <>
      <section className="flex flex-col flex-1 gap-3 bg-card/80 p-4 overflow-y-auto">
        {state.messages.map((message) => {
          const isMine = message.sender_id === user?.id;

          return isMine ? (
            <div
              key={message.id}
              className="relative self-start bg-background shadow-md px-4 py-2 rounded-2xl max-w-xs"
            >
              <div
                className="top-1/2 -right-2 absolute bg-background w-3 h-3 -translate-y-1/2"
                style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
              />
              <p>{message.content}</p>
              <div className="flex justify-end items-center gap-1 mt-1">
                <span className="text-xs">
                  {new Date(message.created_at).toLocaleTimeString("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="text-blue-800 text-xs">✓✓</span>
              </div>
            </div>
          ) : (
            <div
              key={message.id}
              className="relative self-end bg-message shadow-md px-4 py-2 rounded-2xl max-w-xs"
            >
              <div
                className="top-1/2 -left-2 absolute bg-message w-3 h-3 rotate-180 -translate-y-1/2"
                style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
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
        })}
      </section>
    </>
  );
}
