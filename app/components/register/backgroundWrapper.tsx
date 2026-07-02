import React from "react";

export default function BackgroundWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full min-h-screen">
      <div
        className="z-0 absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "var(--noise-pattern)",
          backgroundSize: "20px 20px",
        }}
      />
      {children}
    </div>
  );
}
