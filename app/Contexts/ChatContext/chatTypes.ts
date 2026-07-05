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
  editingMessage: MessageType | null;
  unreadCounts: Record<string, number>;
  loadingMessages: boolean;
}
export type ChatAction =
  | {
      type: "SET_USERS";
      payload: UserProfile[];
    }
  | {
      type: "SET_SELECTED_USER";
      payload: UserProfile | null;
    }
  | {
      type: "SET_CONVERSATION";
      payload: string;
    }
  | {
      type: "SET_MESSAGES";
      payload: MessageType[];
    }
  | {
      type: "ADD_MESSAGE";
      payload: MessageType;
    }
  | {
      type: "UPDATE_MESSAGE";
      payload: MessageType;
    }
  | {
      type: "DELETE_MESSAGE";
      payload: string;
    }
  | {
      type: "SET_EDITING_MESSAGE";
      payload: MessageType | null;
    }
  | {
      type: "UPDATE_USER";
      payload: UserProfile;
    }
  | {
      type: "INCREMENT_UNREAD";
      payload: string;
    }
  | {
      type: "CLEAR_UNREAD";
      payload: string;
    }
  | {
      type: "RESET_CHAT";
    }
  | {
      type: "SET_LOADING_MESSAGES";
      payload: boolean;
    }
  | {
      type: "SET_UNREAD_COUNTS";
      payload: Record<string, number>;
    };
