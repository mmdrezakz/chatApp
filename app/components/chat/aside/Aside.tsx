import ChatsAside from "./ChatsAside";
import HeaderAside from "./HeaderAside";

export default function Aside() {
  return (
    <aside className="flex flex-col border-border border-l w-80">
      <HeaderAside />
      <ChatsAside />
    </aside>
  );
}
