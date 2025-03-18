import {
  SEEN_MESSAGE_FAILURE,
  SEEN_MESSAGE_REQUEST,
  SEEN_MESSAGE_SUCCESS,
  UNSEEN_MESSAGE_FAILURE,
  UNSEEN_MESSAGE_REQUEST,
  UNSEEN_MESSAGE_SUCCESS,
} from "../actionsType";

const initialState = {
  loading: false,
  message: null,
  error: null,
};

export const messageseenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEEN_MESSAGE_REQUEST:
    case UNSEEN_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEEN_MESSAGE_SUCCESS:
    case UNSEEN_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: action.payload,
      };
    case SEEN_MESSAGE_FAILURE:
    case UNSEEN_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default messageseenReducer;
