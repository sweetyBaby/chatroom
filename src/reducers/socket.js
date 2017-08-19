import {
  WEBSOCKET_CONNECTION, SOCKET_ON_USER_SUCCESS, SOCKET_ON_CHAT_SUCCESS, SOCKET_EMIT_SUCCESS } from '../actions/const';

const initialState = {
  onlineUsers: [],
  chatData: {},
  chatUpdate: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case WEBSOCKET_CONNECTION: {
      return {
        ...state,
      };
    }
    case SOCKET_ON_USER_SUCCESS: {
      return {
        ...state,
        onlineUsers: action.data
      };
    }
    case SOCKET_ON_CHAT_SUCCESS: {
      state.chatData[action.data.opponent] ?
        state.chatData[action.data.opponent].push(action.data) :
        state.chatData[action.data.opponent] = [action.data];
      ++state.chatUpdate;

      console.log('socket-reducer', state.chatData);
      return {
        ...state,
      };
    }
    case SOCKET_EMIT_SUCCESS: {
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
