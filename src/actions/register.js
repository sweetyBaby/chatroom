import 'whatwg-fetch';
import appendQuery from 'append-query';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR, IS_USER_EXIST } from './const';
import config from '../config/base';

const registerUrl = config.api.registerUser;
const userNameExistUrl = config.api.userNameExist;

const registerRequest = () => ({
  type: REGISTER_REQUEST
});

const registerSuccess = (message) => ({
  type: REGISTER_SUCCESS,
  message
});

const registerError = (message) => ({
  type: REGISTER_ERROR,
  message
});

const isUserExist = (result) => ({
  type: IS_USER_EXIST,
  result
});

export const register = ({ username, password }) => (dispatch) => {
  dispatch(registerRequest());
  return fetch(registerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'same-origin',
  })
    .then((res) => res.json())
    .then((res) => {
      const { result, message } = res;
      if (result) {
        dispatch(registerSuccess(message));
      } else {
        dispatch(registerError(message));
      }
    })
    .catch(() => {
      dispatch(registerError('注册失败'));
    });
};

export const checkUserExist = (username) => (dispatch) => {
  const url = appendQuery(userNameExistUrl, { username }, { removeNull: true });
  return fetch(url, { credentials: 'same-origin' })
    .then((res) => res.json())
    .then((res) => {
      const { result } = res;
      dispatch(isUserExist(result));
    })
    .catch(() => {
      throw Error('无法连接后台');
    });
};

