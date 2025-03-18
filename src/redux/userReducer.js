import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  UPDATEUSER_REQUEST,
  UPDATEUSER_SUCCESS,
  UPDATEUSER_FAILURE,
} from "./actionsType";


const initialState = {
  isLoading: false,
  user: null,
  error: null,
};


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      case UPDATEUSER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    
    case FETCH_USER_SUCCESS:
    case UPDATEUSER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
      };
    case FETCH_USER_FAILURE:
      case UPDATEUSER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
