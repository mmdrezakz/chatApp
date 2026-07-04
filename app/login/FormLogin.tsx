"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Button from "../components/ui/Button";
import Link from "next/link";
import LoadingForm from "../components/ui/loading/LoadingForm";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase/client";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail) {
      toast.error("ایمیل را وارد کنید");
      return;
    }

    if (!cleanPassword) {
      toast.error("رمز عبور را وارد کنید");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (error) {
        toast.error("ایمیل یا رمز عبور اشتباه است");
        return;
      }

      if (!data.session) {
        toast.error("ورود انجام نشد");
        return;
      }

      toast.success("ورود موفق");

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-4 bg-card shadow-md shadow-shadow p-5 rounded-2xl"
    >
      <p className="mb-6 font-bold text-2xl text-center">ورود</p>

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
        <button type="submit" className="py-3 rounded-sm w-full">
          ورود
        </button>
      )}

      <div className="mt-6 text-center">
        <span>حساب ندارید؟ </span>

        <Link href="/register">
          <Button className="mx-2 py-1 rounded-sm w-20 font-bold">
            ثبت نام
          </Button>
        </Link>
      </div>
    </form>
  );
}
