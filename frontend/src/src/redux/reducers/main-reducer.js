import {
  SHOW_LOADER,
  SHOW_TOASTER,
  THEME,
  TOASTER_ERROR,
} from "../constants/common.action";
import { USER_DETAILS, USER_ID } from "../constants/user.constant";
import { GET_ALL_WORKSPACES } from "../constants/workspace.constants";

const initialState = {
  theme: "Light",
  showLoader: false,
  showToaster: false,
  toasterError: { type: "", message: "" },
  userId: "",
  userDetails: {},
  allWorkspaces: [],
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
    default:
      return state;
  }
};
