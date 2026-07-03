import { SquarePen } from "lucide-react";

export default function InfoItem({
  label,
  value,
  onClick,
}: {
  label: string;
  value?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="relative bg-card hover:bg-foreground/10 shadow-sm p-3 border border-border rounded-xl cursor-pointer"
    >
      <p className="mb-1 text-muted-foreground text-xs">{label}</p>
      <p className="font-medium break-all">{value || "-"}</p>
      {label !== "ایمیل" && label !== "تاریخ عضویت" && (
        <div className="top-1/2 left-5 absolute">
          <SquarePen size={19} />
        </div>
      )}
    </div>
  );
}
