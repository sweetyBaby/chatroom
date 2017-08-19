import { combineReducers } from 'redux';
import app from './app';
import login from './login';
import register from './register';
import socket from './socket';

const reducers = {
  app,
  login,
  register,
  socket
};
const combined = combineReducers(reducers);
export default combined;
