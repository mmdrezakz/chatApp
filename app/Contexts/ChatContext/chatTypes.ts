import { UserProfile } from "../type";

export interface MessageType {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface ChatState {
  users: UserProfile[];
  selectedUser: UserProfile | null;
  conversationId: string | null;
  messages: MessageType[];
}
export type ChatAction =
  | {
      type: "SET_USERS";
      payload: UserProfile[];
    }
  | {
      type: "SET_SELECTED_USER";
      payload: UserProfile;
    }
  | {
      type: "SET_CONVERSATION";
      payload: string;
    }
  | {
      type: "SET_MESSAGES";
      payload: MessageType[];
    };
