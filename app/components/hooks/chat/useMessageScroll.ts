"use client";

import { useEffect, RefObject } from "react";

export function useMessageScroll(
  ref: RefObject<HTMLDivElement | null>,
  dependency: unknown,
) {
  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [dependency]);
}
