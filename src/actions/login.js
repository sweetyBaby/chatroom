import 'whatwg-fetch';
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
  CHECK_LOGIN_REQUEST, CHECK_LOGIN_SUCCESS, CHECK_LOGIN_ERROR,
  LOGOUT_SUCCESS,
} from './const';
import config from '../config/base';

const loginUrl = config.api.loginUser;
const checkUserUrl = config.api.checkUser;

const loginRequest = () => ({
  type: LOGIN_REQUEST
});

const loginSuccess = (user, message, result) => ({
  type: LOGIN_SUCCESS,
  user,
  message,
  result,
});

const loginError = (message, result) => ({
  type: LOGIN_ERROR,
  message,
  result,
});

const checkUserRequest = () => ({
  type: CHECK_LOGIN_REQUEST,
});
const checkUserSuccess = (user, result) => ({
  type: CHECK_LOGIN_SUCCESS,
  user,
  result,
});

const checkUserError = (result) => ({
  type: CHECK_LOGIN_ERROR,
  result,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const login = ({ username, password }) => (dispatch) => {
  dispatch(loginRequest());
  return fetch(loginUrl, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then((res) => res.json())
    .then((res) => {
      const { result, data, message } = res;
      const user = data || [];
      if (result) {
        dispatch(loginSuccess(user, message, result));
      } else {
        dispatch(loginError(message, result));
      }
    })
    .catch(() => {
      dispatch(loginError('登录失败'));
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(logoutSuccess());
};

export const checkUser = () => (dispatch) => {
  dispatch(checkUserRequest());
  return fetch(checkUserUrl, {
    credentials: 'same-origin',
  })
  .then((res) => res.json())
  .then((res) => {
    const { result, data } = res;
    const user = data || [];
    if (result) {
      dispatch(checkUserSuccess(user, result));
    } else {
      dispatch(checkUserError(result));
    }
  });
};
