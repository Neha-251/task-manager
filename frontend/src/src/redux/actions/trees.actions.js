import axios from "axios";
import {
  CREATE_NEW_TREE,
  GET_ALL_TREES,
  UPDATE_TREE,
} from "../constants/trees.constants";
import {
  setShowLoader,
  setShowToaster,
  setToasterError,
} from "./common.action";

export const setAllTrees = (payload) => {
  return {
    type: GET_ALL_TREES,
    payload: payload,
  };
};

export const getAllTrees = (workspaceId) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .get(
      `https://task-manager-backend-teal.vercel.app/trees/get/all?workspaceId=${workspaceId}`
    )
    .then((res) => {
      dispatch(setAllTrees(res.data));
      dispatch(setShowLoader(false));
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};

export const createNewTree = (data) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .post("https://task-manager-backend-teal.vercel.app/trees/create", data)
    .then((res) => {
      dispatch(setShowLoader(false));
      dispatch(
        setToasterError({
          type: "success",
          message: "Tree created successfully",
        })
      );
      dispatch(setShowToaster(true));

      dispatch({
        type: CREATE_NEW_TREE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};

export const updateTree = (id, data) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .patch(
      `https://task-manager-backend-teal.vercel.app/trees/update/${id}`,
      data
    )
    .then((res) => {
      dispatch(setShowLoader(false));

      dispatch({
        type: UPDATE_TREE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};
