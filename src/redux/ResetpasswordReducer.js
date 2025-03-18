import {
  SENDOTP_REQUEST,
  SENDOTP_SUCCESS,
  SENDOTP_FAILURE,
  VERIFYOTP_REQUEST,
  VERIFYOTP_SUCCESS,
  VERIFYOTP_FAILURE,
  NEWPASSWORD_REQUEST,
  NEWPASSWORD_SUCCESS,
  NEWPASSWORD_FAILURE,
} from "./actionsType";

const initialState = {
  loading: false,
  status: null,
  error: null,
};

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case SENDOTP_REQUEST:
    case VERIFYOTP_REQUEST:
    case NEWPASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SENDOTP_SUCCESS:
    case VERIFYOTP_SUCCESS:
    case NEWPASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    case SENDOTP_FAILURE:
    case VERIFYOTP_FAILURE:
    case NEWPASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default resetPasswordReducer;
