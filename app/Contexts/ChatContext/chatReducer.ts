import { ChatAction, ChatState } from "./chatTypes";

export const initialState: ChatState = {
  users: [],
  selectedUser: null,
  conversationId: null,
  messages: [],
  editingMessage: null,
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
    default:
      return state;
  }
}
