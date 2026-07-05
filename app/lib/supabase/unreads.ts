import { supabase } from "./client";

export async function getUnreadCounts(currentUserId: string) {
  const { data, error } = await supabase.rpc("get_unread_counts", {
    current_user_id: currentUserId,
  });

  if (error) throw error;

  const counts: Record<string, number> = {};

  data.forEach((row: any) => {
    counts[row.sender_id] = Number(row.unread_count);
  });

  return counts;
}
