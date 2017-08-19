import React, { Component } from 'react';
import { Input, message, Modal } from 'antd';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';
import styles from './main.css';

const Search = Input.Search;
const confirm = Modal.confirm;

export default class Header extends Component {
  componentWillMount() {
    this.state = { cookies: cookie.loadAll() };
  }
  searchHandle = (value) => {
    if (value) {
      console.log(value);
    }
  }

  onLogout = () => {
    const {logoutUser} = this.props.actions;
    confirm({
      title: '确认退出？',
      onOk() {
        logoutUser();
        cookie.remove('cookies', { path: '/' });
        browserHistory.push('/login');
        message.success('退出成功');
      },
      onCancel() {
      },
    });
  };

  render() {
    const { user, actions } = this.props;
    const userName = user.username || '';

    return (
      <div className={styles.header}>
        <div className={styles.searchInput}>
          <Search placeholder="搜索" onSearch={value => this.searchHandle(value)} />
        </div>
        <div className={styles.nickName}>{userName}</div>
        <div className={styles.logout} onClick={this.onLogout}>【 退出 】</div>
      </div>
    );
  }
}
