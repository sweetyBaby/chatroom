import React from 'react';
import { notification } from 'antd';
import styles from './main.css';


class Index extends React.Component {
  sendHandle = (e) => {
    console.log(e.target.value);
  }

  componentDidUpdate(prevProps) {
    const { friend, chatData } = this.props;
    console.log('chatroom', friend);
    if (!friend.userId || !prevProps.chatData[friend]) {

      return;
    }
    if (prevProps.chatData[friend].length !== chatData[friend].length) {
      console.log('!!!should update!!!');
    }
  }

  render() {
    const { users, user, friend = {}, chatData = {}, chatUpdate } = this.props;

    const me = { username: user.username, word: '' };

    return (
      <ul className={styles.chatroom}>
        {
          friend.userId && chatData[friend.userId] &&
          chatData[friend.userId].map((data, index) => {
            const { fromMe } = data;
            return (<li key={index} className={fromMe ? styles.me : styles.friend}>
              {data.data}<span>{fromMe ? me.username : friend.name}</span>
            </li>);
          })
        }
      </ul>
    );
  }
}
export default Index;
