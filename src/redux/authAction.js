import axios from "axios"; // Assuming you're using axios for API calls
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./actionsType";
import { toast } from "react-toastify";

import { logout as apiLogout } from "../config/auth";

// Asynchronous action creator for login
export const login = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      // Replace the URL with your API endpoint
      const response = await axios.post(
        "http://localhost:8000/api/auth/loginPassword",
        credentials
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data, // Assume the API returns user data on success
      });
       toast.success("you have login");
      // Optionally, save user data to localStorage or perform other side effects here
      localStorage.setItem("token",response.data.token);
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response.data,
      });
       toast.error(error.response.data.error);
    }
  };
};


export const logout = () => {
  return async (dispatch) => {
    try {
      await apiLogout();
      dispatch({ type: LOGOUT });
      localStorage.removeItem("token");
      toast.success("you have logout");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
};

