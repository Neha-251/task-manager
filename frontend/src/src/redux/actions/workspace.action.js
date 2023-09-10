import axios from "axios";
import {
  setShowLoader,
  setShowToaster,
  setToasterError,
} from "./common.action";
import {
  CREATE_NEW_BADGE,
  CURRENT_WORKSPACE,
  GET_ALL_BADGES,
  GET_ALL_WORKSPACES,
  UPDATE_BADGE,
} from "../constants/workspace.constants";

export const setAllWorkspaces = (payload) => {
  return {
    type: GET_ALL_WORKSPACES,
    payload: payload,
  };
};

export const setCurrentWorkspace = (payload) => {
  return {
    type: CURRENT_WORKSPACE,
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

export const getCurrentWorkspace = (workspaceId) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .get(`http://localhost:5000/workspaces/get/${workspaceId}`)
    .then((res) => {
      dispatch(setCurrentWorkspace(res.data));
      dispatch(setShowLoader(false));
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};

export const getAllBadges = (workspaceId) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .get(`http://localhost:5000/badges/get/all?workspaceId=${workspaceId}`)
    .then((res) => {
      dispatch(setShowLoader(false));
      dispatch({
        type: GET_ALL_BADGES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};

export const createNewBadge = (data) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .post("http://localhost:5000/badges/create", data)
    .then((res) => {
      dispatch(setShowLoader(false));
      dispatch({
        type: CREATE_NEW_BADGE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};

export const updateBadge = (data, id) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .patch(`http://localhost:5000/badges/update/${id}`, data)
    .then((res) => {
      dispatch(setShowLoader(false));
      dispatch({
        type: UPDATE_BADGE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};
