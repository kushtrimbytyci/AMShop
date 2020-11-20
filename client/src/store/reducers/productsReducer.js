import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_PRODUCT_DETAILS,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_SUCCESS,
  RESET_ERROR,
} from "../types";

const initState = {
  products: [],
  loading: false,
  product: {},
  error: null,
  searchedProducts: [],
  productLength: null,
};

const productsReducer = (state = initState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
    case PRODUCT_SEARCH_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        productLength: action.length,
      };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, products: [], loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_PRODUCT_DETAILS:
      return {
        ...state,
        loading: false,
        error: null,
        products: [],
        product: {},
      };
    case PRODUCT_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        searchedProducts: action.payload,
      };
    case PRODUCT_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        searchedProducts: [],
      };
    case RESET_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default productsReducer;
