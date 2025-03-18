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
import sendotp from "../config/auth";
import { verifyOtp, resetPassword } from "../config/auth";
import { toast } from "react-toastify";

export const sendOtp = (credentialsdata, setStep) => {
  return async (dispatch) => {
    dispatch({ type: SENDOTP_REQUEST });
    try {
      const response = await sendotp(credentialsdata, toast);
      dispatch({
        type: SENDOTP_SUCCESS,
        payload: response.data, // Assume the API returns user data on success
      });
      setStep(2);
      toast.success(response.message);
      console.log("response", response);
    } catch (error) {
      dispatch({
        type: SENDOTP_FAILURE,
        payload: error.response,
      });
      console.log(error);
    }
  };
};
export const otpVerify = (verifyOtpdata, setStep) => {
  return async (dispatch) => {
    dispatch({ type: VERIFYOTP_REQUEST });
    try {
      const response = await verifyOtp(verifyOtpdata, toast);
      dispatch({
        type: VERIFYOTP_SUCCESS,
        payload: response.data, // Assume the API returns user data on success
      });
      setStep(3);
      toast.success(response.message);
    } catch (error) {
      dispatch({
        type: VERIFYOTP_FAILURE,
        payload: error.response,
      });
    }
  };
};
export const passwordReset = (newpassworddata) => {
  return async (dispatch) => {
    dispatch({ type: NEWPASSWORD_REQUEST });
    try {
      const response = await resetPassword(newpassworddata);
      dispatch({
        type: NEWPASSWORD_SUCCESS,
        payload: response.data, // Assume the API returns user data on success
      });
      toast.success(response.data.message);
    } catch (error) {
      dispatch({
        type: NEWPASSWORD_FAILURE,
        payload: error.response,
      });
    }
  };
};
