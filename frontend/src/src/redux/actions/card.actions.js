import { CREATE_NEW_CARD, GET_ALL_CARDS } from "../constants/card.constants";

export const getAllCards = (workspaceId, treeId) => (dispatch) => {
  dispatch(setShowLoader(true));

  axios
    .get(
      `http://localhost:5000/cards/get/all?workspaceId=${workspaceId}&treeId=${treeId}`
    )
    .then((res) => {
      dispatch(setShowLoader(false));

      return {
        type: GET_ALL_CARDS,
        payload: { treeId, data: res.data },
      };
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

      return {
        type: CREATE_NEW_CARD,
        payload: { treeId: data.treeId, data },
      };
    })
    .catch((err) => {
      dispatch(setShowLoader(false));
    });
};
