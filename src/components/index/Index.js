import React from 'react';
import { Input, Button } from 'antd';
import styles from './main.css';
import UserList from './userList';
import Header from './header';
import ChatRoom from './chatroom';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friend: [] };
  }
  sendHandle = (e) => {
    // senderId
    // receiverId
    // to_session_id
    // data
    // sendTime
    // dataType
    console.log(e.target.value);
    const { user, onlineUsers, actions } = this.props;
    var { friend } = this.state;// 通过username遍历onlineUsers

    const sendObj = {
      senderId: user._id,
      receiverId: friend.userId,
      to_session_id: friend.sessionId,
      data: e.target.value.trim(),
      sendTime: Date.now(),
      dataType: 'text',
    };
    // console.log(sendObj);
    actions.emitSocket('chat', sendObj);
    e.target.value=''; // 清空输入框
  };
  getFriend = (newState) => {
    this.setState({ friend: newState });
  }
  render() {
    const { users, user, actions, onlineUsers, chatData, chatUpdate } = this.props;
    const { friend } = this.state;
    // console.log('index-index', onlineUsers);

    return (
      <div className={styles.container}>
        <Header user={user} actions={actions} />
        <div className={styles.main}>
          <UserList users={users} onlineUsers={onlineUsers} change={this.getFriend} />
          <div className={styles.chatPlate} >
            <ChatRoom user={user} friend={friend} chatData={chatData} chatUpdate={chatUpdate} />
            <Input
              className={styles.input}
              onPressEnter={e => this.sendHandle(e)
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Index;

