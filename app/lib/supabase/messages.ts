import { supabase } from "./client";

export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string,
) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      content,
    })
    .select()
    .single();

  if (error) throw error;

  await supabase.from("message_reads").insert({
    message_id: data.id,
    user_id: senderId,
  });

  return data;
}

export async function getMessages(conversationId: string) {
  //3

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}
export async function updateMessage(messageId: string, content: string) {
  const { data, error } = await supabase
    .from("messages")
    .update({
      content,
    })
    .eq("id", messageId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
export async function deleteMessage(messageId: string) {
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", messageId);

  if (error) {
    throw error;
  }

  return true;
}
