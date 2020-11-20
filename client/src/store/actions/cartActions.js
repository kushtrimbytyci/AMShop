import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
} from "../types";
import axios from "axios";

// By using getState function, we can get the state like this, getState.products or getState.cart
export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        id: data.data.id,
        name: data.data.name,
        image: data.data.image,
        price: data.data.price,
        countInStock: data.data.countInStock,
        quantity,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {}
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  const cartItems = getState().cart.cartItems;
  const index = cartItems.findIndex((item) => {
    return item.id === id;
  });

  cartItems.splice(index, 1);
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: cartItems,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  } catch (error) {}
};

export const savePaymentMethod = (paymentMethod) => {
  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
  return {
    type: SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  };
};
