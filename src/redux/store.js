import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import rootReducer from "./rootReducer";

const persistedState = localStorage.getItem("user")
  ? { auth: { user: JSON.parse(localStorage.getItem("user")) } }
  : {};

const store = createStore(rootReducer,persistedState, applyMiddleware(thunk));

export default store;
