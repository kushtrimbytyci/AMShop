import {
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_CREATE_PRODUCT_MODAL,
  HIDE_CREATE_PRODUCT_MODAL,
} from "../types";

const initState = {
  showModal: false,
  showCreateProductModal: false,
};

const modalReducer = (state = initState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, showModal: true };
    case HIDE_MODAL:
      return { ...state, showModal: false };
    case SHOW_CREATE_PRODUCT_MODAL:
      return { ...state, showCreateProductModal: true };
    case HIDE_CREATE_PRODUCT_MODAL:
      return { ...state, showCreateProductModal: false };
    default:
      return state;
  }
};

export default modalReducer;
