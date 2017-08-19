// import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { register, checkUserExist } from '../actions/register';
import { login } from '../actions/login';
import Main from '../components/register';

function mapStateToProps(state) {
  const props = {
    ...state.default.register,
    ...state.default.login
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actions = { register, checkUserExist, login };
  const actionMap = { actions: {
    ...bindActionCreators(actions, dispatch)
  } };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);

