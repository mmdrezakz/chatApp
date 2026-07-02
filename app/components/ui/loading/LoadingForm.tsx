import React from "react";
import Button from "../Button";
import { Loader } from "lucide-react";

export default function LoadingForm() {
  return (
    <Button
      type="submit"
      className="flex justify-center items-center gap-5 py-3 w-full"
    >
      <Loader />
      <span>در حال انجام</span>
    </Button>
  );
}
