import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actionsType";
import { toast } from "react-toastify";
  

export const addUser = (credentials, navigate) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        credentials,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: error.response.data && error.response.data.error,
      });
      toast.error(error.response.data.error);
    }
  };
};