import {
  SENDMESSAGE_REQUEST,
  SENDMESSAGE_SUCCESS,
  SENDMESSAGE_FAILURE,
} from "../actionsType";

const initialState = {
  loading: false,
  message: null,
  error: null,
};

export const sendmessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SENDMESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SENDMESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: action.payload,
      };
    case SENDMESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload ,
      };
    default:
      return state;
  }
};
export default sendmessageReducer;
