import { FETCH_MESSAGE_FAILURE, FETCH_MESSAGE_REQUEST, FETCH_MESSAGE_SUCCESS } from "../actionsType";
import { getMessage } from "../../config/auth";

export const getmessage = (userId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_MESSAGE_REQUEST });
    try {
      const response = await getMessage(userId);
      dispatch({
        type: FETCH_MESSAGE_SUCCESS,
        payload: response.messages,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MESSAGE_FAILURE,
        payload: error.error,
      });
    }
  };
};