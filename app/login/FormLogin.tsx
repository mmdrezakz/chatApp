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
    // اعتبارسنجی ساده
    if (!email || !password) {
      toast.error("لطفاً ایمیل و رمز عبور را وارد کنید");
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log(error.message);
        toast.error("یکی از شناسه ها را اشتباه وارد کرده اید.");
        return;
      }

      router.push("/");
      toast.success("ورود موفق");
    } catch (error) {
      toast.error("خطا در ارتباط با سرور");
      setLoading(false);
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
          ورود
        </Button>
      )}

      <div className="mt-6 text-center">
        <span>حساب ندارید؟ </span>

        <Link href={"/register"}>
          <Button className="mx-2 py-1 rounded-sm w-20 font-bold">
            ثبت نام
          </Button>
        </Link>
      </div>
    </form>
  );
}
