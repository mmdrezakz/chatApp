"use client";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      onClick={onCancel}
      className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card shadow-xl p-6 rounded-2xl w-[90%] max-w-md"
      >
        <h2 className="mb-2 font-bold text-lg">{title}</h2>

        <p className="mb-6 text-muted-foreground">{description}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-border rounded-lg"
          >
            انصراف
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 px-4 py-2 rounded-lg text-white"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
