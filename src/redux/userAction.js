import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  UPDATEUSER_REQUEST,
  UPDATEUSER_SUCCESS,
  UPDATEUSER_FAILURE,
} from "./actionsType";
import { getUser, updateuser } from "../config/auth"; 


export const fetchUser = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_REQUEST });

    try {
        const userData = await getUser();
        localStorage.setItem("user", JSON.stringify(userData));
      dispatch({
          type: FETCH_USER_SUCCESS,
          payload: userData,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USER_FAILURE,
        payload: error.error,
      });
    }
  };
};

export const updateUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATEUSER_REQUEST });
    try {
      const userupdate = await updateuser(userData);
      dispatch({
        type: UPDATEUSER_SUCCESS,
        payload: userupdate,
      });
    } catch (error) {
      dispatch({
        type: UPDATEUSER_FAILURE,
        payload: error.error
      })
    }
  }
}
