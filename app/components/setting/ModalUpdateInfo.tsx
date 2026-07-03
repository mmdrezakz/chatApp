import { X } from "lucide-react";
import LoadingForm from "../ui/loading/LoadingForm";
import { ModalUpdateInfoProps } from "./type";
import { useAuth } from "@/app/Contexts/AuthContent";
import toast from "react-hot-toast";
import { supabase } from "@/app/lib/supabase/client";

export default function ModalUpdateInfo({
  setEditField,
  setEditValue,
  editValue,
  editLoading,
  setEditLoading,
  editField,
}: ModalUpdateInfoProps) {
  const { user, refreshUser } = useAuth();

  const closeModal = () => {
    setEditField("");
    setEditValue("");
  };

  const handleUpdate = async () => {
    setEditLoading(true);

    if (!user) {
      setEditLoading(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        [editField]: editValue,
      })
      .eq("id", user.id);

    if (error) {
      toast.error(error.message);
      setEditLoading(false);

      return;
    }

    await refreshUser();

    setEditField("");
    setEditValue("");
    setEditLoading(false);

    toast.success("اطلاعات بروزرسانی شد");
  };

  return (
    <div
      onClick={closeModal}
      className="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-card p-5 rounded-xl w-80"
      >
        <button onClick={closeModal} className="items-center rounded-sm">
          <X />
        </button>
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="p-2 border rounded w-full"
        />
        {editLoading ? (
          <LoadingForm />
        ) : (
          <button onClick={handleUpdate} className="mt-3 p-2 rounded w-full">
            ذخیره
          </button>
        )}
      </div>
    </div>
  );
}
