"use client";

import React, { useState } from "react";
import Button from "../components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingForm from "../components/ui/loading/LoadingForm";
import { supabase } from "../lib/supabase/client";

export default function Form() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🔍 Email:", email.trim());
      console.log("🔍 Password length:", password.length);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/verify-email`,
          data: {
            username: username.trim(),
            full_name: fullName.trim(),
            phone: phone.trim(),
          },
        },
      });
      console.log("DATA:", data);
      console.log("ERROR:", error);
      console.log("🔍 Response:", { data, error });

      if (error) {
        console.error("❌ Error details:", {
          message: error.message,
          status: error.status,
          name: error.name,
        });

        const errorMessages: Record<string, string> = {
          "User already registered": "این ایمیل قبلاً ثبت‌نام کرده است",
          "Password should be at least 6 characters":
            "رمز عبور باید حداقل ۶ کاراکتر باشد",
          "Invalid email": "ایمیل معتبر نیست",
        };

        toast.error(
          errorMessages[error.message] || error.message || "خطا در ثبت‌نام",
        );
        setLoading(false);
        return;
      }

      if (!data.user) {
        toast.error("مشکل در ایجاد کاربر");
        setLoading(false);
        return;
      }

      console.log("✅ User created:", data.user.id);

      // ذخیره اطلاعات برای بعد از تایید ایمیل
      localStorage.setItem("pending_email", email.trim());
      localStorage.setItem(
        "pending_profile",
        JSON.stringify({
          id: data.user.id,
          username: username.trim(),
          full_name: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
        }),
      );

      toast.success("📧 ایمیل تایید ارسال شد! لطفاً ایمیل خود را بررسی کنید.");
      router.push("/check-email");
    } catch (err: any) {
      console.error("❌ Catch error:", err);
      toast.error(err.message || "خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="space-y-4 bg-card shadow-md shadow-shadow p-5 rounded-2xl"
    >
      <p className="mb-6 font-bold text-2xl text-center">ثبت نام</p>

      <input
        type="text"
        placeholder="نام کاربری"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="bg-transparent p-3 border border-border focus:border-primary rounded-lg focus:outline-none w-full transition-colors"
        disabled={loading}
      />

      <input
        type="text"
        placeholder="نام و نام خانوادگی"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="bg-transparent p-3 border border-border focus:border-primary rounded-lg focus:outline-none w-full transition-colors"
        disabled={loading}
      />

      <input
        type="text"
        placeholder="شماره تلفن"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="bg-transparent p-3 border border-border focus:border-primary rounded-lg focus:outline-none w-full transition-colors"
        disabled={loading}
      />

      <input
        type="email"
        placeholder="ایمیل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-transparent p-3 border border-border focus:border-primary rounded-lg focus:outline-none w-full transition-colors"
        disabled={loading}
      />

      <input
        type="password"
        placeholder="رمز عبور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-transparent p-3 border border-border focus:border-primary rounded-lg focus:outline-none w-full transition-colors"
        disabled={loading}
      />

      {loading ? (
        <LoadingForm />
      ) : (
        <Button type="submit" className="py-3 w-full">
          ثبت نام
        </Button>
      )}

      <div className="mt-6 text-center">
        <span>قبلاً ثبت نام کرده‌اید؟ </span>
        <Link href="/login">
          <Button className="mx-2 py-1 rounded-sm w-10 font-bold">ورود</Button>
        </Link>
      </div>
    </form>
  );
}
