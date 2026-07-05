import { supabase } from "./client";

export async function markMessagesAsRead(
  conversationId: string,
  currentUserId: string,
) {
  const { data: unreadMessages, error } = await supabase
    .from("messages")
    .select("id")
    .eq("conversation_id", conversationId)
    .neq("sender_id", currentUserId);

  if (error) throw error;

  if (!unreadMessages?.length) return;

  const messageIds = unreadMessages.map((m) => m.id);

  const { data: existingReads } = await supabase
    .from("message_reads")
    .select("message_id")
    .eq("user_id", currentUserId)
    .in("message_id", messageIds);

  const readIds = new Set(existingReads?.map((r) => r.message_id) || []);

  const rows = unreadMessages
    .filter((msg) => !readIds.has(msg.id))
    .map((msg) => ({
      message_id: msg.id,
      user_id: currentUserId,
    }));

  if (!rows.length) return;

  const { error: insertError } = await supabase
    .from("message_reads")
    .upsert(rows, {
      onConflict: "message_id,user_id",
    });

  if (insertError) throw insertError;
}
