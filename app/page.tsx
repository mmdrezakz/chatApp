import Aside from "./components/chat/aside/Aside";
import MainAreaChat from "./components/chat/main/MainAreaChat";

export default function Page() {
  return (
    <div className="flex h-screen">
      <Aside />
      <MainAreaChat />
    </div>
  );
}
