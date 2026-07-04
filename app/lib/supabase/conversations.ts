import { supabase } from "./client";

export async function findConversation(
  currentUserId: string,
  targetUserId: string,
) {
  const { data: currentUserConversations, error } = await supabase
    .from("conversation_members")
    .select("conversation_id")
    .eq("user_id", currentUserId);

  if (error) {
    throw error;
  }

  const conversationIds = currentUserConversations.map(
    (item) => item.conversation_id,
  );

  if (!conversationIds.length) {
    return null;
  }

  const { data: targetConversation, error: targetError } = await supabase
    .from("conversation_members")
    .select("conversation_id")
    .eq("user_id", targetUserId)
    .in("conversation_id", conversationIds)
    .maybeSingle();

  if (targetError) {
    throw targetError;
  }

  return targetConversation?.conversation_id ?? null;
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
  const existingConversation = await findConversation(
    currentUserId,
    targetUserId,
  );

  if (existingConversation) {
    return existingConversation;
  }

  const newConversation = await createConversation(currentUserId, targetUserId);

  return newConversation;
}
