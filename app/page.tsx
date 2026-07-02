import Aside from "./components/chat/aside/Aside";
import MainAreaChat from "./components/chat/main/MainAreaChat";
import AuthProvider from "./Contexts/AuthContent";

export default function Page() {
  return (
    <AuthProvider>
      <div className="flex h-screen">
        <Aside />
        <MainAreaChat />
      </div>
    </AuthProvider>
  );
}
