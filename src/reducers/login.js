import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
  CHECK_LOGIN_REQUEST, CHECK_LOGIN_SUCCESS, CHECK_LOGIN_ERROR,
  LOGOUT_SUCCESS } from '../actions/const';

const initialState = {
  loaded: false,
  Logined: false,//cookie登录
  loginState: false,//表单登录
  user: [],
  mes: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loaded: true
      };
    }
    case LOGIN_SUCCESS: {
      // console.log('actions-login.js', state);
      return {
        ...state,
        loaded: false,
        user: action.user,
        mes: action.message,
        loginState: action.result,
        Logined: true
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        loaded: false,
        mes: action.message,
        loginState: action.result,
      };
    }
    case CHECK_LOGIN_REQUEST: {
      return {
        ...state
      };
    }
    case CHECK_LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        Logined: action.result
      };
    }
    case CHECK_LOGIN_ERROR: {
      return {
        ...state,
        Logined: action.result

      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
export default reducer;
