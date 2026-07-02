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

    // اعتبارسنجی
    if (!username || !fullName || !phone || !email || !password) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }

    if (password.length < 6) {
      toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    if (phone.length < 10) {
      toast.error("شماره تلفن معتبر نیست");
      return;
    }

    setLoading(true);

    try {
      // 1. ثبت نام در Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        const errorMessages: Record<string, string> = {
          "User already registered": "این ایمیل قبلاً ثبت نام کرده است",
          "Password should be at least 6 characters":
            "رمز عبور باید حداقل ۶ کاراکتر باشد",
          "Email not confirmed": "ایمیل تایید نشده است",
        };
        toast.error(errorMessages[error.message] || error.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        toast.error("مشکل در ایجاد کاربر");
        setLoading(false);
        return;
      }

      // 2. ایجاد پروفایل در جدول profiles
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        username,
        full_name: fullName,
        phone,
        email: email,
        created_at: new Date().toISOString(),
      });

      if (profileError) {
        console.error("Profile error:", profileError);
        toast.error("مشکل در ایجاد پروفایل");
        setLoading(false);
        return;
      }

      toast.success("ثبت نام با موفقیت انجام شد! 🎉");

      // 3. هدایت به صفحه اصلی
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("خطا در ارتباط با سرور");
      setLoading(false);
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
        className="p-3 w-full"
      />

      <input
        type="text"
        placeholder="نام و نام خانوادگی"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="p-3 w-full"
      />

      <input
        type="text"
        placeholder="شماره تلفن"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-3 w-full"
      />

      <input
        type="email"
        placeholder="ایمیل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 w-full"
      />

      <input
        type="password"
        placeholder="رمز عبور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 w-full"
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
        <Link href={"/login"}>
          <Button className="mx-2 py-1 rounded-sm w-10 font-bold">ورود</Button>
        </Link>
      </div>
    </form>
  );
}
