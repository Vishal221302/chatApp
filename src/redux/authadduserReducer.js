import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actionsType";

const initialState = {
  loading: false,
  user: null,
  error: null,
};



export const adduserReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };
      case REGISTER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload || "Registration failed",
        };      
      default:
        return state;
     
    }
};
export default adduserReducer;