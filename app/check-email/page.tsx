"use client";

import { useState, useEffect } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase/client";

import WrapperForm from "../components/ui/wrapper/WrapperForm";

export default function CheckEmailPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const pendingEmail = localStorage.getItem("pending_email");

    console.log("PENDING EMAIL:", pendingEmail);

    if (pendingEmail) {
      setEmail(pendingEmail);
    }
  }, []);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error("ایمیل یافت نشد");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (error) {
        console.error(error);

        toast.error(error.message);

        return;
      }

      toast.success("📧 ایمیل تایید مجدداً ارسال شد");
    } catch (error) {
      console.error(error);
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <WrapperForm>
      <div className="relative flex justify-center items-center bg-background">
        <div className="bg-card shadow-lg p-8 rounded-2xl w-full max-w-md text-center">
          <div className="bg-foreground/10 mx-auto p-4 rounded-full w-fit">
            <Mail className="w-16 h-16 text-primary" />
          </div>

          <h2 className="mt-4 font-bold text-2xl">📧 ایمیل تایید ارسال شد!</h2>

          <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
            یک ایمیل حاوی لینک تایید به آدرس زیر ارسال شده است:
          </p>

          <p className="bg-foreground/5 mt-2 p-2 rounded-lg font-medium text-primary text-sm">
            {email || "ایمیل شما"}
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-950/20 mt-6 p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-700 dark:text-yellow-400 text-sm">
              ⚠️ لطفاً ایمیل خود را بررسی کنید و روی لینک تایید کلیک کنید.
            </p>

            <p className="mt-1 text-yellow-600 dark:text-yellow-500 text-xs">
              اگر ایمیلی دریافت نکردید، روی دکمه ارسال مجدد کلیک کنید.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button
              type="button"
              onClick={handleResendEmail}
              disabled={loading}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50 py-3 rounded-lg text-white transition-colors disabled:cursor-not-allowed"
            >
              {loading ? "در حال ارسال..." : "📨 ارسال مجدد ایمیل تایید"}
            </button>

            <Link
              href="/login"
              className="flex justify-center items-center gap-2 text-gray-500 hover:text-primary text-sm transition-colors"
            >
              <ArrowLeft size={16} />
              بازگشت به صفحه ورود
            </Link>
          </div>
        </div>
      </div>
    </WrapperForm>
  );
}
