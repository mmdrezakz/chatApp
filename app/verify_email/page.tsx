"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase/client";

import WrapperForm from "../components/ui/wrapper/WrapperForm";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    let processed = false;

    const handleVerifiedUser = async (userId: string) => {
      if (processed) return;
      processed = true;

      try {
        const pendingProfile = localStorage.getItem("pending_profile");

        if (pendingProfile) {
          const profile = JSON.parse(pendingProfile);

          const { error } = await supabase.from("profiles").upsert({
            id: userId,
            username: profile.username,
            full_name: profile.full_name,
            phone: profile.phone,
            email: profile.email,
          });

          if (error) {
            console.error("Profile upsert error:", error);
          }

          localStorage.removeItem("pending_profile");
        }

        localStorage.removeItem("pending_email");

        setStatus("success");
        setMessage("ایمیل با موفقیت تایید شد 🎉");

        setTimeout(() => {
          router.replace("/");
        }, 1500);
      } catch (err) {
        console.error(err);

        setStatus("error");
        setMessage("خطا در تکمیل فرآیند تایید ایمیل");
      }
    };

    const initialize = async () => {
      try {
        // اگر سشن از قبل ساخته شده باشد
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          await handleVerifiedUser(session.user.id);
          return;
        }

        // منتظر ساخت سشن توسط Supabase بمان
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (
            (event === "SIGNED_IN" || event === "INITIAL_SESSION") &&
            session?.user
          ) {
            await handleVerifiedUser(session.user.id);
          }
        });

        // اگر بعد از چند ثانیه سشنی ساخته نشد
        setTimeout(() => {
          if (!processed) {
            setStatus("error");
            setMessage("لینک تایید نامعتبر است یا منقضی شده است");
          }
        }, 5000);

        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error(err);

        setStatus("error");
        setMessage("خطا در تایید ایمیل");
      }
    };

    const cleanupPromise = initialize();

    return () => {
      cleanupPromise?.then?.((cleanup) => cleanup?.());
    };
  }, [router]);

  return (
    <WrapperForm>
      <div className="flex justify-center items-center bg-background">
        <div className="bg-card shadow-lg p-8 rounded-2xl w-full max-w-md text-center">
          {status === "loading" && (
            <>
              <LoaderCircle className="mx-auto w-16 h-16 text-primary animate-spin" />
              <h2 className="mt-4 font-bold text-xl">در حال تایید ایمیل...</h2>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="mx-auto w-16 h-16 text-green-500" />
              <h2 className="mt-4 font-bold text-green-500 text-xl">
                تایید شد
              </h2>
              <p className="mt-2 text-gray-500 text-sm">{message}</p>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="mx-auto w-16 h-16 text-red-500" />
              <h2 className="mt-4 font-bold text-red-500 text-xl">خطا</h2>

              <p className="mt-2 text-gray-500 text-sm">{message}</p>

              <Link
                href="/login"
                className="inline-block mt-4 text-primary underline"
              >
                رفتن به صفحه ورود
              </Link>
            </>
          )}
        </div>
      </div>
    </WrapperForm>
  );
}
