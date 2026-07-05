// Contexts/AuthContent.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, UserProfile } from "./type";
import { supabase } from "../lib/supabase/client";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function getUserProfile() {
    try {
      setLoading(true);
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(profile);
      //آنلاین کردن کاربر
      await supabase
        .from("profiles")
        .update({
          is_online: true,
          last_seen: new Date().toISOString(),
        })
        .eq("id", authUser.id);
    } catch (error) {
      console.error("Error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    if (user) {
      await supabase
        .from("profiles")
        .update({
          is_online: false,
          last_seen: new Date().toISOString(),
        })
        .eq("id", user.id);
    }

    await supabase.auth.signOut();

    setUser(null);
    router.push("/login");
    router.refresh();
  };

  const refreshUser = async () => {
    await getUserProfile();
  };

  useEffect(() => {
    getUserProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        getUserProfile();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  //چک کردن لحظه ای آنلاین بود
  useEffect(() => {
    if (!user) return;

    const handleOffline = async () => {
      await supabase
        .from("profiles")
        .update({
          is_online: false,
          last_seen: new Date().toISOString(),
        })
        .eq("id", user.id);
    };

    window.addEventListener("beforeunload", handleOffline);

    return () => {
      window.removeEventListener("beforeunload", handleOffline);
    };
  }, [user]);
  //آپدیت کردن لست سین به صورت مرتب
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      await supabase
        .from("profiles")
        .update({
          last_seen: new Date().toISOString(),
        })
        .eq("id", user.id);
    }, 30000);

    return () => clearInterval(interval);
  }, [user]);
  return (
    <AuthContext.Provider
      value={{ user, loading, getUserProfile, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
