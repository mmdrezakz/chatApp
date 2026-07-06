import { ChatAction, ChatState } from "./chatTypes";

export const initialState: ChatState = {
  users: [],
  selectedUser: null,
  conversationId: null,
  messages: [],
  messageCache: {},
  editingMessage: null,
  unreadCounts: {},
  loadingMessages: false,
  loadingUsers: true,
  conversationCache: {},
};

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_SELECTED_USER":
      return {
        ...state,
        selectedUser: action.payload,
      };
    case "SET_CONVERSATION":
      return {
        ...state,
        conversationId: action.payload,
      };
    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };
    case "ADD_MESSAGE":
      if (state.messages.some((msg) => msg.id === action.payload.id)) {
        return state;
      }

      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "UPDATE_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id ? action.payload : msg,
        ),
      };
    case "SET_EDITING_MESSAGE":
      return {
        ...state,
        editingMessage: action.payload,
      };
    case "DELETE_MESSAGE":
      return {
        ...state,
        messages: state.messages.filter((msg) => msg.id !== action.payload),
      };
    case "UPDATE_USER":
      return {
        ...state,

        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        ),

        selectedUser:
          state.selectedUser?.id === action.payload.id
            ? action.payload
            : state.selectedUser,
      };

    case "INCREMENT_UNREAD":
      return {
        ...state,
        unreadCounts: {
          ...state.unreadCounts,
          [action.payload]: (state.unreadCounts[action.payload] || 0) + 1,
        },
      };

    case "CLEAR_UNREAD":
      const counts = { ...state.unreadCounts };

      delete counts[action.payload];

      return {
        ...state,
        unreadCounts: counts,
      };
    case "RESET_CHAT":
      return initialState;
    case "SET_LOADING_MESSAGES":
      return {
        ...state,
        loadingMessages: action.payload,
      };
    case "SET_UNREAD_COUNTS":
      return {
        ...state,
        unreadCounts: action.payload,
      };
    case "CACHE_MESSAGES":
      return {
        ...state,
        messageCache: {
          ...state.messageCache,
          [action.payload.conversationId]: action.payload.messages,
        },
      };
    case "CACHE_CONVERSATION":
      return {
        ...state,
        conversationCache: {
          ...state.conversationCache,
          [action.payload.userId]: action.payload.conversationId,
        },
      };
    case "SET_LOADING_USERS":
      return {
        ...state,
        loadingUsers: action.payload,
      };
    case "MARK_MESSAGE_READ": {
      const updatedMessages = state.messages.map((msg) =>
        msg.id === action.payload
          ? {
              ...msg,
              isRead: true,
            }
          : msg,
      );

      return {
        ...state,
        messages: updatedMessages,

        messageCache: state.conversationId
          ? {
              ...state.messageCache,
              [state.conversationId]: updatedMessages,
            }
          : state.messageCache,
      };
    }

    default:
      return state;
  }
}
