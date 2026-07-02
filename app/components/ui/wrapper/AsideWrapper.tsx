import { AsideWrapperProps } from "./type";

export default function AsideWrapper({ children, text }: AsideWrapperProps) {
  return (
    <header className="flex justify-between items-center px-4 py-5 border-border border-b">
      <h2 className="font-bold text-lg">{text}</h2>
      {children}
    </header>
  );
}
