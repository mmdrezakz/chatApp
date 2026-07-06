import { supabase } from "./client";

export async function findConversation(
  currentUserId: string,
  targetUserId: string,
) {
  //1
  console.time("query1");
  const { data: currentUserConversations, error } = await supabase
    .from("conversation_members")
    .select("conversation_id")
    .eq("user_id", currentUserId);
  console.timeEnd("query1");
  if (error) throw error;

  const conversationIds = currentUserConversations.map(
    (item) => item.conversation_id,
  );

  if (!conversationIds.length) return null;

  //2
  console.time("query2");
  const { data, error: targetError } = await supabase
    .from("conversation_members")
    .select("conversation_id")
    .eq("user_id", targetUserId)
    .in("conversation_id", conversationIds)
    .limit(1);
  console.timeEnd("query2");
  if (targetError) throw targetError;

  return data?.[0]?.conversation_id ?? null;
}

export async function createConversation(
  currentUserId: string,
  targetUserId: string,
) {
  const { data: conversation, error: conversationError } = await supabase
    .from("conversations")
    .insert({})
    .select()
    .single();

  if (conversationError) {
    throw conversationError;
  }

  const { error: membersError } = await supabase
    .from("conversation_members")
    .insert([
      {
        conversation_id: conversation.id,
        user_id: currentUserId,
      },
      {
        conversation_id: conversation.id,
        user_id: targetUserId,
      },
    ]);

  if (membersError) {
    throw membersError;
  }

  return conversation.id;
}

export async function openConversation(
  currentUserId: string,
  targetUserId: string,
) {
  const existingConversation = await findConversationRpc(
    currentUserId,
    targetUserId,
  );

  if (existingConversation) {
    return existingConversation;
  }

  return await createConversation(currentUserId, targetUserId);
}
export async function findConversationRpc(
  currentUserId: string,
  targetUserId: string,
) {
  const { data, error } = await supabase.rpc(
    "find_conversation_between_users",
    {
      user1: currentUserId,
      user2: targetUserId,
    },
  );

  if (error) throw error;

  return data;
}
