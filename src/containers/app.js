import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { loadApp } from '../actions/app';
import { getUsers } from '../actions/user';
import { checkUser, logoutUser } from '../actions/login';
import { init, onSocket, emitSocket } from '../actions/socket';
import MainPage from '../components/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { onlineUsers: [] };
  }
  componentDidMount() {
    const { checkUser, getUsers, init, onSocket } = this.props.actions;
    checkUser().then(() => {
      const { Logined } = this.props;

      if (Logined) { // 拉取用户列表
        getUsers();
        init();
      } else {
        browserHistory.push('/login');
      }
    });
  }

  render() {
    // user 当前登录用户
    // users 用户列表
    const { actions, users, user, getUserState, count, onlineUsers, chatData, chatUpdate } = this.props;
    return (
      <MainPage
        users={users}
        user={user}
        actions={actions}
        onlineUsers={onlineUsers}
        chatData={chatData}
        chatUpdate={chatUpdate}
      />
    );
  }
}

function mapStateToProps(state) {
  const props = {
    ...state.default.app,
    ...state.default.login,
    ...state.default.socket
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actions = { loadApp, getUsers, checkUser, logoutUser, init, onSocket, emitSocket };
  const actionMap = { actions: {
    ...bindActionCreators(actions, dispatch)
  } };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
