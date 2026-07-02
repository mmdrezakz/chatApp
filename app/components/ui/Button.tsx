import React from "react";
import { ButtonProps } from "./type";

export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} hover:scale-110 active:scale-95 transition-all duration-200 bg-button rounded-md  text-foreground`}
    >
      {children}
    </button>
  );
}
