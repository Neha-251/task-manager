import {
  CREATE_NEW_CARD,
  GET_ALL_CARDS,
  GET_TOTAL_CARDS,
} from "../constants/card.constants";
import {
  SHOW_LOADER,
  SHOW_TOASTER,
  THEME,
  TOASTER_ERROR,
} from "../constants/common.action";
import { CREATE_NEW_TREE, GET_ALL_TREES } from "../constants/trees.constants";
import { USER_DETAILS, USER_ID } from "../constants/user.constant";
import {
  CREATE_NEW_BADGE,
  CURRENT_WORKSPACE,
  GET_ALL_BADGES,
  GET_ALL_WORKSPACES,
  UPDATE_BADGE,
} from "../constants/workspace.constants";

const initialState = {
  theme: "Light",
  showLoader: false,
  showToaster: false,
  toasterError: { type: "", message: "" },
  userId: "",
  userDetails: {},
  allWorkspaces: [],
  currentWorkspace: {},
  allTrees: [],
  allCards: [],
  allBadges: [],
  totalCards: 0,
};

export const MainReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case THEME:
      return { ...state, theme: payload };
    case SHOW_LOADER:
      return { ...state, showLoader: payload };
    case SHOW_TOASTER:
      return { ...state, showToaster: payload };
    case TOASTER_ERROR:
      return { ...state, toasterError: payload };
    case USER_ID:
      return { ...state, userId: payload, showLoader: false };
    case USER_DETAILS:
      return { ...state, userDetails: payload, showLoader: false };
    case GET_ALL_WORKSPACES:
      return { ...state, allWorkspaces: payload, showLoader: false };
    case CURRENT_WORKSPACE:
      return { ...state, currentWorkspace: payload, showLoader: false };
    case GET_ALL_TREES:
      return { ...state, allTrees: payload, showLoader: false };
    case CREATE_NEW_TREE:
      return {
        ...state,
        allTrees: [...state.allTrees, payload],
        showLoader: false,
      };
    case GET_ALL_CARDS: {
      const _allCards = state.allCards;
      let newAllCards = [];

      // if allcards contains object with treeId, replace the data of the object

      if (_allCards.some((card) => card.treeId === payload.treeId)) {
        for (let i = 0; i < _allCards.length; i++) {
          const card = _allCards[i];

          if (card.treeId === payload.treeId) {
            newAllCards.push(payload);
          } else {
            newAllCards.push(card);
          }
        }
      } else {
        newAllCards = [..._allCards, payload];
      }

      return {
        ...state,
        allCards: newAllCards,
        showLoader: false,
      };
    }
    case CREATE_NEW_CARD: {
      const _allCards = state.allCards;

      let newAllCards = [];

      if (_allCards.some((card) => card.treeId === payload.treeId)) {
        for (let i = 0; i < _allCards.length; i++) {
          const card = _allCards[i];

          if (card.treeId === payload.treeId) {
            newAllCards.push({
              ...payload,
              data: [...card.data, payload.data],
            });
          } else {
            newAllCards.push(card);
          }
        }
      } else {
        newAllCards = [
          ..._allCards,
          { treeId: payload.treeId, data: [payload.data] },
        ];
      }
      return {
        ...state,
        allCards: newAllCards,
        totalCards: state.totalCards + 1,
        showLoader: false,
      };
    }
    case GET_ALL_BADGES:
      return { ...state, allBadges: payload, showLoader: false };
    case CREATE_NEW_BADGE:
      return {
        ...state,
        allBadges: [...state.allBadges, payload],
        showLoader: false,
      };
    case UPDATE_BADGE:
      const _allBadges = state.allBadges;

      const newBadges = [];
      _allBadges.forEach((badge) => {
        if (badge._id === payload._id) {
          let newBadge = {
            name: payload.name,
            color: payload.color,
            workspaceId: payload.workspaceId,
          };
          newBadges.push(newBadge);
        } else {
          newBadges.push(badge);
        }
      });

      return {
        ...state,
        allBadges: newBadges,
        showLoader: false,
      };
    case GET_TOTAL_CARDS:
      return { ...state, totalCards: payload, showLoader: false };
    default:
      return state;
  }
};
