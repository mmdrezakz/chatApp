import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/theme/Theme";
import "./globals.css";
import { Vazirmatn } from "next/font/google";
import AuthProvider from "./Contexts/AuthContent";
import ChatProvider from "./Contexts/ChatContext/ChatContext";
const vazir = Vazirmatn({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`h-full`}>
      <body className={`flex flex-col min-h-full ${vazir.className}`}>
        <ThemeProvider>
          <AuthProvider>
            <ChatProvider>{children}</ChatProvider>
          </AuthProvider>

          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--card)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
