import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_MY_ORDERS,
  ORDER_CLEAR_SUCCESS,
  ORDER_ADMIN_REQUEST,
  ORDER_ADMIN_SUCCESS,
  ORDER_ADMIN_FAIL,
} from "../types";
const initState = {
  loading: false,
  order: [],
  error: null,
  success: false,
  orderDetails: [],
  shippingAddress: {},
  allOfMyOrders: [],
  adminOrdersList: [],
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, orderDetails: action.payload };
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ALL_MY_ORDERS:
      return {
        ...state,
        loading: false,
        success: false,
        allOfMyOrders: action.payload,
      };
    case ORDER_CLEAR_SUCCESS:
      return { ...state, success: false };
    case ORDER_ADMIN_REQUEST:
      return { ...state, loading: true };
    case ORDER_ADMIN_SUCCESS:
      return { ...state, loading: false, adminOrdersList: action.payload };
    case ORDER_ADMIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default orderReducer;
