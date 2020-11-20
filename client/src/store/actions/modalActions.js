import {
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_CREATE_PRODUCT_MODAL,
  HIDE_CREATE_PRODUCT_MODAL,
} from "../types";

export const showModalAction = () => {
  return {
    type: SHOW_MODAL,
  };
};

export const hideModalAction = () => {
  return {
    type: HIDE_MODAL,
  };
};

export const showCreateProductModalAction = () => {
  return {
    type: SHOW_CREATE_PRODUCT_MODAL,
  };
};

export const hideCreateProductModalAction = () => {
  return {
    type: HIDE_CREATE_PRODUCT_MODAL,
  };
};
