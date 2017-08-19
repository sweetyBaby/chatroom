import io from 'socket.io-client';
import {
  WEBSOCKET_CONNECTION, SOCKET_ON_USER_SUCCESS, SOCKET_ON_CHAT_SUCCESS, SOCKET_EMIT_SUCCESS
} from './const';

const connectionSuccess = (socket) => ({
  type: WEBSOCKET_CONNECTION,
  socket,
});

const socketOnUserSuccess = (data) => ({
  type: SOCKET_ON_USER_SUCCESS,
  data,
});

const socketOnChatSuccess = (data) => ({
  type: SOCKET_ON_CHAT_SUCCESS,
  data,
});

const socketEmitSuccess = () => ({
  type: SOCKET_EMIT_SUCCESS
});
var socket = {};
// 创建socket连接
export const init = () => (dispatch) => {
  socket = io();
  dispatch(connectionSuccess());
  socket.on('users', data => {
    dispatch(socketOnUserSuccess(data.users));
  });
  socket.on('chat', data => {
    dispatch(socketOnChatSuccess(data));
  });
};

// socket.emit
export const emitSocket = (type, args) => (dispatch) => {
  socket.emit(type, args);
  dispatch(socketEmitSuccess());
};
