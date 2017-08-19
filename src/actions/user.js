import 'whatwg-fetch';
import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR } from './const';
import config from '../config/base';

const getUserUrl = config.api.getUser;

const getUsersRequest = () => ({
  type: GET_USER_REQUEST
});

const getUsersSuccess = (data, count, result) => ({
  type: GET_USER_SUCCESS,
  data,
  count,
  result
});

const getUsersError = (message, result) => ({
  type: GET_USER_ERROR,
  message,
  result
});

// 拉取所有用户
export const getUsers = () => (dispatch) => {
  dispatch(getUsersRequest());
  return fetch(getUserUrl, { credentials: 'same-origin' })
  .then((res) => res.json())
  .then((res) => {
    const { message, data, count, result } = res;
    if (result) {
      dispatch(getUsersSuccess(data, count, result));
    } else {
      dispatch(getUsersError(message, result));
    }
  });
};
// websocket 拉取在线用户
