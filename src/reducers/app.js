import { APP_LOAD, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR } from '../actions/const';

const initialState = {
  loaded: false,
  users: [],
  count: 0,
  getUserState: false,
  mes: '',
  onlineUsers: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case APP_LOAD: {
      return {
        ...state,
        loaded: true
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        loaded: true
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        loaded: false,
        users: action.data,
        count: action.count,
        getUserState: action.result
      };
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        loaded: false,
        mes: action.message,
        getUserState: action.result
      };
    }
    default: {
      return state;
    }
  }
}
export default reducer;
