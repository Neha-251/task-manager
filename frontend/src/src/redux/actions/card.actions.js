import axios from "axios";
import {
  CREATE_NEW_CARD,
  DELETE_CARD,
  GET_ALL_CARDS,
  GET_CARD,
  GET_LAST_CARD_ID,
  GET_TOTAL_CARDS,
  UPDATE_CARD,
} from "../constants/card.constants";
import {
  setShowLoader,
  setShowToaster,
  setToasterError,
} from "./common.action";

export const getAllCards = (workspaceId, treeId) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .get(
      `https://task-manager-backend-teal.vercel.app/cards/get/all?workspaceId=${workspaceId}&treeId=${treeId}`
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
    .post("https://task-manager-backend-teal.vercel.app/cards/create", data)
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
      `https://task-manager-backend-teal.vercel.app/cards/get/totalCards?workspaceId=${workspaceId}`
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

export const getLastCardId = (workspaceId) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .get(
      `https://task-manager-backend-teal.vercel.app/cards/get/lastCardId?workspaceId=${workspaceId}`
    )
    .then((res) => {
      dispatch(setShowLoader(false));

      dispatch({
        type: GET_LAST_CARD_ID,
        payload: +res.data.lastCardId,
      });
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};

export const deleteCard = (id, treeId) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .delete(`https://task-manager-backend-teal.vercel.app/cards/delete/${id}`)
    .then((res) => {
      dispatch(setShowLoader(false));
      dispatch(setToasterError({ type: "success", message: res.data.message }));
      dispatch(setShowToaster(true));
      dispatch({
        type: DELETE_CARD,
        payload: { id, treeId },
      });
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};

export const getCard = (id) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .get(`https://task-manager-backend-teal.vercel.app/cards/get/single/${id}`)
    .then((res) => {
      dispatch(setShowLoader(false));
      dispatch({ type: GET_CARD, payload: res.data });
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};

export const updateCard = (id, data) => (dispatch) => {
  dispatch(setShowLoader(true));

  fetch(`https://task-manager-backend-teal.vercel.app/cards/update/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PATCH",

    // Fields that to be updated are passed
    body: JSON.stringify(data),
  })
    .then((res) => {
      dispatch(setShowLoader(false));
      dispatch(
        setToasterError({
          type: "success",
          message: "Card updated successfully",
        })
      );
      dispatch(setShowToaster(true));
      dispatch({
        type: UPDATE_CARD,
        payload: { treeId: data.treeId, data: res.data },
      });
    })
    .catch((err) => console.log(err));
};
