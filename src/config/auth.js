import axios from "axios";
import { configData } from "./api";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export default async function sendotp(credentials, toast) {
  try {
    const response = await axios.post(
      `${configData.apiUrl}sendOtp`,
      credentials,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (err) {
    toast.error(err.response.data.error);
    if (err.response.data) {
      throw new Error(err.response.data.error);
    }
  }
}

export  async function verifyOtp(verifyOtpdata, toast) {
  try {
    const response = await axios.post(
      `${configData.apiUrl}verifyOtp`,
      verifyOtpdata,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (err) {
    toast.error(err.response.data.error);
    if (err.response.data) {
      throw new Error(err.response.data.error);
    }
  }
}

export async function resetPassword(setpassworddata) {
  try {
    const response = await axios.post(
      `${configData.apiUrl}resetpassword`,
      setpassworddata,
      {
        headers: headers,
      }
    );
    return response.data.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
  }
}


export async function logout() {
  const token = localStorage.getItem("token");

  headers["Authorization"] = "Bearer " + token;

  const response = await axios.get(`${configData.apiUrl}logout`, {
    headers: headers,
  });

  if (response.status == 200) {
    localStorage.clear();
    return response.data;
  }
}


export async function getUser() {
  const token = localStorage.getItem("token");
  if (token === null) return null;
  
  headers["Authorization"] = "Bearer " + token;

  try {
    const response = await axios.get(`${configData.apiUrl}userInfo`, {
      headers: headers,
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data);
    }
  }
}

export async function getallUser() {
  const token = localStorage.getItem("token");
  if (token === null) return null;
  headers["Authorization"] = "Bearer " + token;
  try {
    const response = await axios.get(`${configData.apiUrl}getAlluser`, {
      headers: headers,
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data);
    }
  }
}

export async function sendMessage(messagedata) {
  const token = localStorage.getItem("token");
  if (token === null) return null;
 
  try {
    const response = await axios.post(`${configData.apiUrl}sendMessage`,messagedata, {
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
        Accept: "Application/json",
      },
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data);
    }
  }
}

export async function getMessage(userId) {
  const token = localStorage.getItem("token");
  if (token === null) return null;
  headers["Authorization"] = "Bearer " + token;
  try {
    const response = await axios.get(
      `${configData.apiUrl}messages/${userId}`,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data);
    }
  }
}

export async function seenMessage(id) {
  const token = localStorage.getItem("token");
  if (token === null) return null;
  const headers = {
    Authorization: "Bearer " + token,
  };
  try {
    const response = await axios.post(`${configData.apiUrl}seenmessage/${id}`,{}, {
      headers: headers,
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data);
    }
  }
}

export async function unseenMessage(userId) {
  const token = localStorage.getItem("token");
  if (token === null) return null;
  headers["Authorization"] = "Bearer " + token;
  try {
    const response = await axios.get(
      `${configData.apiUrl}unseencount/${userId}`,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data);
    }
  }
}

export async function updateuser(dataform) {
  const token = localStorage.getItem("token");
  if (token === null) return null;
  headers["Authorization"] = "Bearer " + token;
  try {
    const response = await axios.put(`${configData.apiUrl}updateprofile`,dataform, {
      headers: headers,
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data);
    }
  }
}
