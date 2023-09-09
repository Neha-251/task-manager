import {
  SHOW_LOADER,
  SHOW_MODAL,
  SHOW_TOASTER,
  THEME,
  TOASTER_ERROR,
} from "../constants/common.action";

export const setTheme = (payload) => {
  return {
    type: THEME,
    payload: payload,
  };
};

export const setShowModal = (payload) => {
  return {
    type: SHOW_MODAL,
    payload: payload,
  };
};

export const setShowLoader = (payload) => {
  return {
    type: SHOW_LOADER,
    payload: payload,
  };
};

export const setShowToaster = (payload) => {
  return {
    type: SHOW_TOASTER,
    payload: payload,
  };
};

export const setToasterError = (payload) => {
  return {
    type: TOASTER_ERROR,
    payload: payload,
  };
};
