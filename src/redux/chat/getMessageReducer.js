import {
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE,
} from "../actionsType";

const initialState = {
  loading: false,
  message: null,
  error: null,
};

export const getmessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: action.payload,
      };
    case FETCH_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getmessageReducer;
