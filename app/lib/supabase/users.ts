import { supabase } from "./client";

export async function getAllUsers(currentUserId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .neq("id", currentUserId);

  if (error) {
    throw error;
  }

  return data;
}
