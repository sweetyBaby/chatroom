import React from 'react';
import { Menu, Icon } from 'antd';
import styles from './main.css';

const SubMenu = Menu.SubMenu;

class Index extends React.Component {
  state = {
    openKeys: [],
  }
  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
  handleClick = (e) => {
     this.props.change(this.props.onlineUsers[e.key]);
  }
  render() {
    const { users, onlineUsers = [] } = this.props;
    // console.log('userlist.js', this.props.onlineUsers);
    return (
      <div className={styles.userList}>
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          onClick={this.handleClick}
        >
          <SubMenu key="allUser" title={<span><Icon type="user" /><span>所有用户</span></span>}>
            {
              users.map((user) => {
                const { username, _id } = user;
                return (
                  <Menu.Item key={_id} className={styles.userItem}>
                    <div>{username}</div>
                  </Menu.Item>
                );
              })
            }
          </SubMenu>
          <SubMenu key="onlineUser" title={<span><Icon type="user" /><span>在线用户</span></span>}>
            {
             onlineUsers.map((user, index) => {
               const { name, userId } = user;
               return (
                 <Menu.Item key={index} className={styles.userItem}>
                   <div>{name}</div>
                 </Menu.Item>
               );
             })
          }
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
export default Index;
