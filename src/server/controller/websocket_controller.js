const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');
const User = mongoose.model('User');

let users = [];

function findInUsers(sessionId) { // 通过sessionId查找
  let index = -1;
  // console.log('findInUsers', users, sessionId);
  for (let j = 0, len = users.length; j < len; j++) {
    if (users[j].sessionId === sessionId) {
      index = j;
    }
  }
  return index;
}
function findUserById(userId) {
  let index = -1;
  for (let j = 0, len = users.length; j < len; j++) {
    if (users[j].userId.toString() == userId.toString()) {
      index = j;
    }
  }
  return index;
}
module.exports.addUser = (name, userId, sessionId) => { // 添加在线用户
  sessionId = encodeURIComponent(sessionId);
  const indexById = findUserById(userId);
  const index = findInUsers(sessionId);
  if (indexById !== -1) {
    users[indexById].sessionId = sessionId;
  } else if (index === -1) {
    // not exist
    users.push({ name, userId, sessionId, socket: null });
    // console.log('websocket-addUser', users);
  } else if (users[index].name !== name) { // update name, which may not be used in this pj
    users[index].name = name;
  }
  return users;
};

function broadcastMessage(type, data) {
  for (let j = 0, len = users.length; j < len; j++) {
    // console.log('broadcast', users[j].name, users[j].userId, users[j].socket == null);
    users[j].socket && users[j].socket.emit(type, data);
  }
}

function setUserSocket(sessionId, socket) { // 更新用户socket
  // console.log('setUserSocket-socket', socket);
  // console.log('setUserSocket-users', users);

  const index = findInUsers(sessionId);
  console.log('setUserSocket', index, sessionId, socket == null);
  if (index !== -1) {
    users[index].socket = socket;
  }
}
function findUser(sessionId) { // 查找
  const index = findInUsers(sessionId);
  return index > -1 ? users[index] : null;
}
function getSessionId(cookieString, cookieName) {
  const matches = new RegExp(cookieName + '=([^;]+)', 'gmi').exec(cookieString);
  // console.log('getSessionid', cookieString, matches)
  return matches ? (matches[1] ? matches[1] : null) : null;
}

module.exports.createServer = (app, port) => {
  const server = require('http').createServer(app);
  const io = require('socket.io')(server);
  io.on('connection', (socket) => {
    console.log('conn', socket.request.headers.cookie);
    console.log(socket.id, ' has been connected.');
    var sessionId = getSessionId(socket.request.headers.cookie, 'connect.sid');
    if (sessionId) {
      setUserSocket(sessionId, socket);
    }
    // broadcast login message

    broadcastMessage('users', {
      users: users.map(function(elem) {
        return { name: elem.name, userId: elem.userId, sessionId: elem.sessionId };
      })
    });

    socket.on('chat', (data) => {
      const fromUser = findUser(sessionId);
      const toUser = findUser(data.to_session_id);
      console.log('chat', data);
      if (fromUser) {
        const chat = new Chat(data);
        socket.emit('chat', {
          ...chat._doc,
          // receiverId: chat.senderId,
          // senderId: chat.receiverId,
          opponent: chat.receiverId,
          result: true,
          fromMe: true
        });
        if (toUser) {
          toUser.socket.emit('chat', {
            ...chat._doc,
            result: true,
            fromMe: false,
            opponent: chat.senderId
            sendTime: new Date()
          });
        }
      }
    });
    socket.on('disconnect', function () {
      // 删除用户socket数据
      console.log(this.id, ' has been disconnected.');
    });
  });

  server.listen(port, (error) => {
    if (error) {
      console.log(error); // eslint-disable-line no-console
    }
    console.info('Express is listening on port %s.', port); // eslint-disable-line no-console
  });
};
