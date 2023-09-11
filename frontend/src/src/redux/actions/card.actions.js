import axios from "axios";
import {
  CREATE_NEW_CARD,
  GET_ALL_CARDS,
  GET_TOTAL_CARDS,
} from "../constants/card.constants";
import { setShowLoader } from "./common.action";

export const getAllCards = (workspaceId, treeId) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .get(
      `http://localhost:5000/cards/get/all?workspaceId=${workspaceId}&treeId=${treeId}`
    )
    .then((res) => {
      dispatch(setShowLoader(false));
      dispatch({
        type: GET_ALL_CARDS,
        payload: { treeId, data: res.data },
      });
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};

export const createNewCard = (data) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .post("http://localhost:5000/cards/create", data)
    .then((res) => {
      dispatch(setShowLoader(false));

      dispatch({
        type: CREATE_NEW_CARD,
        payload: { treeId: data.treeId, data: res.data },
      });
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};

export const getTotalCards = (workspaceId) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .get(
      `http://localhost:5000/cards/get/totalCards?workspaceId=${workspaceId}`
    )
    .then((res) => {
      dispatch(setShowLoader(false));

      dispatch({
        type: GET_TOTAL_CARDS,
        payload: res.data.totalCards,
      });
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};
