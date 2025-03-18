// src/reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { adduserReducer } from "./authadduserReducer";
import { resetPasswordReducer } from "./ResetpasswordReducer";
import userlistReducer from "./chat/userListRedcuer";
import sendmessageReducer from "./chat/sendMesageRedcuer";
import getmessageReducer from "./chat/getMessageReducer";
import messageseenReducer from "./chat/seenunseenmessageRedcuer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  adduser: adduserReducer,
  resetPassword: resetPasswordReducer,
  datalist: userlistReducer,
  sendMessage: sendmessageReducer,
  getMessages: getmessageReducer,
  messgaeSeen: messageseenReducer,
});

export default rootReducer;
