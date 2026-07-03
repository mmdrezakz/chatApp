"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Button from "../components/ui/Button";
import LoadingForm from "../components/ui/loading/LoadingForm";
import { supabase } from "../lib/supabase/client";

export default function Form() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("نام کاربری را وارد کنید");
      return;
    }

    if (!email.trim()) {
      toast.error("ایمیل را وارد کنید");
      return;
    }

    if (password.length < 6) {
      toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    setLoading(true);

    try {
      const cleanData = {
        username: username.trim(),
        full_name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
      };

      // ثبت نام
      const { data, error } = await supabase.auth.signUp({
        email: cleanData.email,
        password,
        options: {
          data: {
            username: cleanData.username,
            full_name: cleanData.full_name,
            phone: cleanData.phone,
          },
        },
      });

      if (error) {
        console.error("SIGNUP ERROR:", error);

        const errorMessages: Record<string, string> = {
          "User already registered": "این ایمیل قبلاً ثبت شده است",
          "Password should be at least 6 characters":
            "رمز عبور باید حداقل ۶ کاراکتر باشد",
          "Invalid email": "ایمیل معتبر نیست",
        };

        toast.error(
          errorMessages[error.message] ?? error.message ?? "خطا در ثبت نام",
        );

        return;
      }

      if (!data.user) {
        toast.error("کاربر ایجاد نشد");
        return;
      }

      // console.log("USER CREATED:", data.user.id);

      // ساخت پروفایل
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        username: cleanData.username,
        full_name: cleanData.full_name,
        phone: cleanData.phone,
        email: cleanData.email,
      });

      if (profileError) {
        console.error(
          "PROFILE INSERT ERROR:",
          JSON.stringify(profileError, null, 2),
        );

        toast.error("خطا در ساخت پروفایل");
        return;
      }
      // ✅ منتظر می‌مانیم تا پروفایل در دیتابیس ثبت شود
      // و سپس سشن را رفرش می‌کنیم
      await new Promise((resolve) => setTimeout(resolve, 500));

      // لاگین خودکار
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: cleanData.email,
        password,
      });

      if (loginError) {
        console.error("AUTO LOGIN ERROR:", loginError);

        toast.success("ثبت نام انجام شد. لطفاً وارد حساب خود شوید.");

        router.push("/login");
        return;
      }
      // ✅ منتظر می‌مانیم تا سشن به‌روز شود
      await new Promise((resolve) => setTimeout(resolve, 300));

      toast.success("ثبت نام موفق");
      // ✅ از router.replace استفاده کنید تا از بازگشت به صفحه ثبت‌نام جلوگیری شود
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      toast.error("خطا در ارتباط با سرور");
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
        disabled={loading}
        className="bg-transparent p-3 border border-border focus:border-primary rounded-lg focus:outline-none w-full"
      />

      <input
        type="text"
        placeholder="نام و نام خانوادگی"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        disabled={loading}
        className="bg-transparent p-3 border border-border focus:border-primary rounded-lg focus:outline-none w-full"
      />

      <input
        type="text"
        placeholder="شماره تلفن"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={loading}
        className="bg-transparent p-3 border border-border focus:border-primary rounded-lg focus:outline-none w-full"
      />

      <input
        type="email"
        placeholder="ایمیل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        className="bg-transparent p-3 border border-border focus:border-primary rounded-lg focus:outline-none w-full"
      />

      <input
        type="password"
        placeholder="رمز عبور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        className="bg-transparent p-3 border border-border focus:border-primary rounded-lg focus:outline-none w-full"
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
