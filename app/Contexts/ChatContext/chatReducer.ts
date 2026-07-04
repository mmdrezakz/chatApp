import { ChatAction, ChatState } from "./chatTypes";

export const initialState: ChatState = {
  users: [],
  selectedUser: null,
  conversationId: null,
  messages: [],
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
    default:
      return state;
  }
}
