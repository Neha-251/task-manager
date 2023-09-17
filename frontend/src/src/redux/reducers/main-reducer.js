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
  SHOW_LOADER,
  SHOW_TOASTER,
  THEME,
  TOASTER_ERROR,
} from "../constants/common.action";
import {
  CREATE_NEW_TREE,
  GET_ALL_TREES,
  UPDATE_TREE,
} from "../constants/trees.constants";
import { USER_DETAILS, USER_ID } from "../constants/user.constant";
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
  currentCard: {},
  allBadges: [],
  totalCards: 0,
  lastCardId: 0,
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
    case CREATE_WORKSPACE:
      return {
        ...state,
        allWorkspaces: [...state.allWorkspaces, payload],
        showLoader: false,
      };
    case DELETE_WORKSPACE:
      return {
        ...state,
        allWorkspaces: state.allWorkspaces.filter(
          (workspace) => workspace._id !== payload
        ),
        showLoader: false,
      };
    case UPDATE_WORKSPACE: {
      const _allWorkspaces = state.allWorkspaces;

      let newAllWorkspaces = [];
      for (let i = 0; i < _allWorkspaces.length; i++) {
        const workspace = _allWorkspaces[i];

        if (workspace._id === payload._id) {
          newAllWorkspaces.push(payload);
        } else {
          newAllWorkspaces.push(workspace);
        }
      }

      return {
        ...state,
        allWorkspaces: newAllWorkspaces,
        showLoader: false,
      };
    }
    case GET_ALL_TREES:
      return { ...state, allTrees: payload, showLoader: false };
    case CREATE_NEW_TREE:
      return {
        ...state,
        allTrees: [...state.allTrees, payload],
        showLoader: false,
      };
    case UPDATE_TREE: {
      const _allTrees = state.allTrees;
      const newAllTrees = [];

      _allTrees.forEach((tree) => {
        if (tree._id === payload._id) {
          newAllTrees.push(payload);
        } else newAllTrees.push(tree);
      });

      return {
        ...state,
        allTrees: newAllTrees,
        showLoader: false,
      };
    }
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
        lastCardId: +state.lastCardId + 1,
        showLoader: false,
      };
    }
    case UPDATE_CARD: {
      const _allCards = state.allCards;
      let newAllCards = [];

      for (let i = 0; i < _allCards.length; i++) {
        const card = _allCards[i];

        if (card.treeId === payload.treeId) {
          let newCardData = [];
          for (let k = 0; k < card.data.length; i++) {
            if (card.data[k]._id === payload.data._id) {
              newCardData.push(payload.data);
            } else {
              newCardData.push(card.data[k]);
            }
          }

          newAllCards.push({
            ...payload,
            data: newCardData,
          });
        } else {
          newAllCards.push(card);
        }
      }

      return {
        ...state,
        allCards: newAllCards,
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
    case GET_LAST_CARD_ID:
      return { ...state, lastCardId: +payload, showLoader: false };
    case GET_CARD:
      return { ...state, currentCard: payload, showLoader: false };
    case DELETE_CARD: {
      const _allCards = state.allCards.filter(
        (card) => card.treeId === payload.treeId
      );
      const updatedData = _allCards[0].data.filter(
        (card) => card._id !== payload.id
      );

      const newAllCards = [];
      for (let i = 0; i < state.allCards.length; i++) {
        const card = state.allCards[i];
        if (card.treeId === payload.treeId)
          newAllCards.push({ treeId: payload.treeId, data: updatedData });
        else newAllCards.push(card);
      }

      return {
        ...state,
        allCards: newAllCards,
        totalCards: state.totalCards - 1,
        showLoader: false,
      };
    }
    default:
      return state;
  }
};
