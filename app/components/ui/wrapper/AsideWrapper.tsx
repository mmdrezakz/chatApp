import { AsideWrapperProps } from "./type";

export default function AsideWrapper({
  children,
  text,
  className = "",
}: AsideWrapperProps) {
  return (
    <header
      className={`${className ? className : " flex justify-between items-center "}  px-4 py-5 border-border border-b `}
    >
      <h2 className="font-bold text-lg">{text}</h2>
      {children}
    </header>
  );
}
