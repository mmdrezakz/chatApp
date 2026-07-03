import { Loader } from "lucide-react";

export default function LoadingForm() {
  return (
    <button
      type="submit"
      className="flex justify-center items-center gap-5 py-3 w-full"
    >
      <Loader />
      <span>در حال انجام</span>
    </button>
  );
}
