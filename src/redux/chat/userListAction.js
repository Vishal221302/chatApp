
import {
  FETCH_ALLUSER_REQUEST,
  FETCH_ALLUSER_SUCCESS,
  FETCH_ALLUSER_FAILURE,
} from "../actionsType";
import { getallUser } from "../../config/auth";

export const fetchallUser = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALLUSER_REQUEST });

    try {
      const userlistData = await getallUser();
      dispatch({
        type: FETCH_ALLUSER_SUCCESS,
        payload: userlistData,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ALLUSER_FAILURE,
        payload: error.error,
      });
    }
  };
};
