import axios from "axios";
import { CREATE_NEW_TREE, GET_ALL_TREES } from "../constants/trees.constants";
import { setShowLoader } from "./common.action";

export const setAllTrees = (payload) => {
  return {
    type: GET_ALL_TREES,
    payload: payload,
  };
};

export const getAllTrees = (workspaceId) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .get(`http://localhost:5000/trees/get/all?workspaceId=${workspaceId}`)
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
    .post("http://localhost:5000/trees/create", data)
    .then((res) => {
      console.log("🚀 ~ file: trees.actions.js:35 ~ .then ~ res:", res);

      dispatch(setShowLoader(false));

      return {
        type: CREATE_NEW_TREE,
        payload: res.data,
      };
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};
