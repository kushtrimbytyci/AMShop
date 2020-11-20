import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_CART,
  ALL_MY_ORDERS,
  ORDER_CLEAR_SUCCESS,
  ORDER_ADMIN_REQUEST,
  ORDER_ADMIN_SUCCESS,
  ORDER_ADMIN_FAIL,
} from "../types";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const { data } = await axios.post("/api/orders/createorder", order, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CLEAR_CART,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const getOrderDetails = (orderID) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/orders/getorder/${orderID}`);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const getAllMyOrders = () => async (dispatch, getState) => {
  const userId = getState().user.user.id;
  try {
    const { data } = await axios.get(`/api/orders/getallorders/${userId}`);
    dispatch({
      type: ALL_MY_ORDERS,
      payload: data.data,
    });
  } catch (error) {}
};

export const clearSuccess = () => {
  return {
    type: ORDER_CLEAR_SUCCESS,
  };
};

export const getAdminOrdersAction = () => async (dispatch) => {
  dispatch({ type: ORDER_ADMIN_REQUEST });
  try {
    const { data } = await axios.get("/api/orders/adminorders");
    dispatch({ type: ORDER_ADMIN_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ORDER_ADMIN_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};
