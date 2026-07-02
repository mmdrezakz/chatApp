import React from "react";
import ThemeToggle from "../../theme/ThemeToggle";

export default function HeaderAside() {
  return (
    <header className="flex justify-between items-center px-4 py-5 border-border border-b">
      <h2 className="font-bold text-lg">گفت و گو ها</h2>
      <ThemeToggle />
    </header>
  );
}
