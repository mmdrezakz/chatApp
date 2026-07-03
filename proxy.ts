import type { NextRequest } from "next/server";
import { updateSession } from "./app/lib/supabase/proxy";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
