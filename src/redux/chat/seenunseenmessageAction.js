import {
  SEEN_MESSAGE_FAILURE,
  SEEN_MESSAGE_REQUEST,
  SEEN_MESSAGE_SUCCESS,
  UNSEEN_MESSAGE_FAILURE,
  UNSEEN_MESSAGE_REQUEST,
  UNSEEN_MESSAGE_SUCCESS,
} from "../actionsType";
import { seenMessage, unseenMessage } from "../../config/auth";

export const seenmessage = (messageId) => {
  return async (dispatch) => {
    dispatch({ type: SEEN_MESSAGE_REQUEST });
    try {
      const response = await seenMessage(messageId);
      dispatch({
        type: SEEN_MESSAGE_SUCCESS,
        payload: response.messages,
      });
    } catch (error) {
      dispatch({
        type: SEEN_MESSAGE_FAILURE,
        payload: error.error,
      });
    }
  };
};

export const unseenmessage = (userId) => {
  return async (dispatch) => {
    dispatch({ type: UNSEEN_MESSAGE_REQUEST });
    try {
      const response = await unseenMessage(userId);
      dispatch({
        type: UNSEEN_MESSAGE_SUCCESS,
        payload: response.messages,
      });
    } catch (error) {
      dispatch({
        type: UNSEEN_MESSAGE_FAILURE,
        payload: error.error,
      });
    }
  };
};
