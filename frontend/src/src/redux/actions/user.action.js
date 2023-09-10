import axios from "axios";
import { USER_DETAILS, USER_ID } from "../constants/user.constant";
import {
  setShowLoader,
  setShowToaster,
  setToasterError,
} from "./common.action";

export const setUserID = (payload) => {
  return {
    type: USER_ID,
    payload: payload,
  };
};

export const setUserDetails = (payload) => {
  return {
    type: USER_DETAILS,
    payload: payload,
  };
};

export const createUser = (userDetails) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .post("http://localhost:5000/users/signup", userDetails)
    .then((res) => {
      dispatch(setUserID(res.data.user._id));
      dispatch(setUserDetails(res.data.user));
      localStorage.setItem("userDetails", res.data.user);
      dispatch(
        setToasterError({
          type: "success",
          message: "Account created successfully",
        })
      );
      dispatch(setShowToaster(true));
    })
    .catch((err) => {
      console.log(err.response.data.message);
      dispatch(setShowLoader(false));
      dispatch(
        setToasterError({ type: "error", message: err.response.data.message })
      );
      dispatch(setShowToaster(true));
    });
};

export const LoginUser = (userDetails) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .post("http://localhost:5000/users/login", userDetails)
    .then((res) => {
      dispatch(setUserID(res.data.user._id));
      dispatch(setUserDetails(res.data.user));
      localStorage.setItem("userDetails", res.data.user);
      dispatch(
        setToasterError({ type: "success", message: "Logged in successfully" })
      );
      dispatch(setShowToaster(true));
    })
    .catch((err) => {
      console.log(err);
      dispatch(setShowLoader(false));
      dispatch(
        setToasterError({ type: "error", message: err.response.data.message })
      );
      dispatch(setShowToaster(true));
    });
};
