// components/theme/ThemeToggle.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./Theme";

export default function ThemeToggle() {
  const { theme, Toggle } = useTheme();

  return (
    <button
      onClick={Toggle}
      className="left-5 absolute flex justify-center items-center rounded-full w-10 h-10 hover:scale-110 active:scale-95 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
