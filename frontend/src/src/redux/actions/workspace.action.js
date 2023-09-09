import axios from "axios";
import {
  setShowLoader,
  setShowToaster,
  setToasterError,
} from "./common.action";
import { GET_ALL_WORKSPACES } from "../constants/workspace.constants";

export const setAllWorkspaces = (payload) => {
  return {
    type: GET_ALL_WORKSPACES,
    payload: payload,
  };
};

export const createWorkspace = (data) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .post("http://localhost:5000/workspaces/create", data)
    .then((res) => {
      dispatch(setShowLoader(false));

      dispatch(
        setToasterError({
          type: "success",
          message: "Workspace created successfully",
        })
      );
      dispatch(setShowToaster(true));
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
      dispatch(
        setToasterError({
          type: "error",
          message: err.response.data.message,
        })
      );
      dispatch(setShowToaster(true));
    });
};

export const getAllWorkspaces = (userId) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .get(`http://localhost:5000/workspaces/get/single?userId=${userId}`)
    .then((res) => {
      dispatch(setAllWorkspaces(res.data));
      dispatch(setShowLoader(false));
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};
