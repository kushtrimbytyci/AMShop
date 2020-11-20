import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  GET_ME,
  UPDATE_USER,
  USER_CLEAR_ERROR,
} from "../types";
import axios from "axios";
import { axiosDefaultHeader } from "../../helpers/axiosDefault";

export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await axios.post("/api/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    axiosDefaultHeader(data.token);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.user,
      token: data.token,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post("/api/login", { email, password });
    localStorage.setItem("token", data.token);
    axiosDefaultHeader(data.token);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.user,
      token: data.token,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: USER_LOGOUT,
  };
};

export const updateUser = (info) => async (dispatch) => {
  try {
    await axios.put(`/api/update/${info.id}`, info);
    const { data } = await axios.get("/api/getme");
    dispatch({
      type: UPDATE_USER,
      payload: data.data,
    });
  } catch (error) {}
};

export const clearUserError = () => {
  return {
    type: USER_CLEAR_ERROR,
  };
};

export const getMe = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/getme", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    axiosDefaultHeader(localStorage.getItem("token"));
    dispatch({
      type: GET_ME,
      payload: data.data,
    });
  } catch (error) {}
};
