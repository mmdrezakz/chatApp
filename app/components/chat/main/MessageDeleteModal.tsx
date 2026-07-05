"use client";

import ConfirmModal from "../../ui/ConfirmModal";

type Props = {
  deleteId: string | null;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
};

export default function MessageDeleteModal({
  deleteId,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <ConfirmModal
      open={!!deleteId}
      title="حذف پیام"
      description="آیا از حذف این پیام مطمئن هستید؟"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
