import {
  LOGIN,
  LOGOUT,
  SET_CURRENT_USER,
  SET_CURRENT_COUNTER,
  SET_CURRENT_TOKEN,
  UPDATE_FAILED_LOGIN,
  RESET_FAILED_COUNTER,
  EDIT_PROFILE,
} from "./rootActions";
import { useNavigate } from "react-router-dom";

import setAuthToken from "../helpers/setAuthToken";
import jwt_decode from "jwt-decode";
export const Login = (userdata, history) => (dispatch) => {
  localStorage.setItem("token", userdata.token);
  localStorage.setItem("user", JSON.stringify(userdata));
  setAuthToken(userdata.token);
  const decodedToken = jwt_decode(userdata.token);
  dispatch(setCurrentToken(decodedToken));
  dispatch(setCurrentUser(userdata));
  dispatch({ type: LOGIN, payload: userdata });
  history.push("/");
  useNavigate.navigate("/");
};
export const editProfile = (userdata) => (dispatch) => {
  localStorage.setItem("user", JSON.stringify(userdata));
  dispatch(setCurrentUser(userdata));
  dispatch({ type: EDIT_PROFILE, payload: userdata });
};
export const UpdateFailedCounter = (counter) => (dispatch) => {
  localStorage.setItem("LoginCount", counter);
  dispatch(setCurrentCounter(counter));
  dispatch({ type: UPDATE_FAILED_LOGIN, payload: counter });
};
export const ResetFailedCounter = () => (dispatch) => {
  localStorage.setItem("LoginCount", 0);
  dispatch(setCurrentCounter(0));
  dispatch({ type: RESET_FAILED_COUNTER, payload: 0 });
};
export const LogOut = () => (dispatch) => {
  debugger
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("LoginCount");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(setCurrentToken({}));
  dispatch({ type: LOGOUT });
};

export const setCurrentToken = (decodedToken) => {
  return {
    type: SET_CURRENT_TOKEN,
    payload: decodedToken,
  };
};
export const setCurrentUser = (decodedToken) => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken,
  };
};
export const setCurrentCounter = (counter) => {
  return {
    type: SET_CURRENT_COUNTER,
    payload: counter,
  };
};
