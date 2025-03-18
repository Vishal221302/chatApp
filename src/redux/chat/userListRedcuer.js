import {
  FETCH_ALLUSER_REQUEST,
  FETCH_ALLUSER_SUCCESS,
  FETCH_ALLUSER_FAILURE,
} from "../actionsType";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

const userlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALLUSER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case FETCH_ALLUSER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_ALLUSER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userlistReducer;
