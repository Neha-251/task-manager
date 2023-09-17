import axios from "axios";
import {
  setShowLoader,
  setShowToaster,
  setToasterError,
} from "./common.action";
import {
  CREATE_NEW_BADGE,
  CREATE_WORKSPACE,
  CURRENT_WORKSPACE,
  DELETE_WORKSPACE,
  GET_ALL_BADGES,
  GET_ALL_WORKSPACES,
  UPDATE_BADGE,
  UPDATE_WORKSPACE,
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
    .post(
      "https://task-manager-backend-teal.vercel.app/workspaces/create",
      data
    )
    .then((res) => {
      dispatch(setShowLoader(false));

      dispatch({ type: CREATE_WORKSPACE, payload: res.data });
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

export const updateWorkspace = (workspaceId, data) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .patch(
      `https://task-manager-backend-teal.vercel.app/workspaces/update/${workspaceId}`,
      data
    )
    .then((res) => {
      dispatch(setShowLoader(false));

      dispatch({ type: UPDATE_WORKSPACE, payload: res.data });
      dispatch(
        setToasterError({
          type: "success",
          message: "Workspace updated successfully",
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
    .get(
      `https://task-manager-backend-teal.vercel.app/workspaces/get/single?userId=${userId}`
    )
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
    .get(
      `https://task-manager-backend-teal.vercel.app/workspaces/get/${workspaceId}`
    )
    .then((res) => {
      dispatch(setCurrentWorkspace(res.data));
      dispatch(setShowLoader(false));
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};

export const deleteWorkspace = (workspaceId) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .delete(
      `https://task-manager-backend-teal.vercel.app/workspaces/delete/${workspaceId}`
    )
    .then((res) => {
      dispatch(setShowLoader(false));
      dispatch(setToasterError({ type: "success", message: res.data.message }));
      dispatch(setShowToaster(true));
      dispatch({ type: DELETE_WORKSPACE, payload: workspaceId });
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};

export const getAllBadges = (workspaceId) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .get(
      `https://task-manager-backend-teal.vercel.app/badges/get/all?workspaceId=${workspaceId}`
    )
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
    .post("https://task-manager-backend-teal.vercel.app/badges/create", data)
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
    .patch(
      `https://task-manager-backend-teal.vercel.app/badges/update/${id}`,
      data
    )
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
