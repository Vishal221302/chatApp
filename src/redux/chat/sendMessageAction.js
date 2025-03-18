import {
  SENDMESSAGE_REQUEST,
  SENDMESSAGE_SUCCESS,
  SENDMESSAGE_FAILURE,
} from "../actionsType";
import { sendMessage } from "../../config/auth";
export const sendmessage = (messagedata) => {
  return async (dispatch) => {
    dispatch({ type: SENDMESSAGE_REQUEST });

    try {
      const response = await sendMessage(messagedata);
      dispatch({
        type: SENDMESSAGE_SUCCESS,
        payload: response,
      });
      console.log("response");
    } catch (error) {
      dispatch({
        type: SENDMESSAGE_FAILURE,
        payload: error.error,
      });
    }
  };
};