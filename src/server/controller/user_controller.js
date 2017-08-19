const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
function hashPW(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}
// 注册
exports.register = (req, res) => {
  // console.log(req.body);
  const user = new User({
    username: req.body.username,
    password: hashPW(req.body.password),
    access: 'user',
  });
  user.save((err) => {
    if (err) {
      // console.log(err);
      req.session.msg = 'Username already exists.';
      // res.redirect('/register');
      res.json({
        message: '该用户名已存在',
        data: null,
        result: false
      });
    } else {
      req.session.destroy(() => {
          // res.redirect('/');
        res.json({
          message: '注册成功',
          data: null,
          result: true
        });
      });
    }
  });
};
// 检测用户名唯一性
exports.userExist = (req, res) => {
  User.findOne({ username: req.query.username })
      .exec((err, user) => {
        if (!user) {
          res.json({
            result: true
          });
        } else {
          res.json({
            result: false
          });
        }
      });
};
// 登录
exports.login = (req, res) => {
    // console.log('login: ' + req.ip);
  User.findOne({ username: req.body.username })
      .exec((err:string, user) => {
        if (!user) {
          err = '用户名不存在';
        } else if (user.password !== hashPW(req.body.password.toString())) {
          err = '密码错误';
        } else if (user.access === 'deleted') {
          err = '用户已被禁';
        } else {
          req.session.regenerate(() => {
            delete user.password;
            req.session.user = user.id;
            req.session.msg = `Authenticated as ${user.username}`;
            // res.cookie('user', user.id);
            // console.log('successfully logged in');
            // console.log('login', req.session);
            // res.redirect('/login_ok');
            res.json({
              message: '登录成功',
              data: user,
              result: true
            });
          });
        }
        if (err) {
          req.session.regenerate(() => {
            req.session.msg = err;
            // console.log(req.session);
            // res.redirect('/login');
            res.json({
              message: err,
              data: null,
              result: false
            });
          });
        }
      });
};
// 退出
exports.logout = (req, res) => {
  req.session.regenerate(() => {
    req.session.msg = 'logged out';
    res.redirect('/');
  });
};
// getUsers
exports.getUsers = (req, res) => {
  var query = User.count().select({ __v: 0, password: 0 });
  query.exec((err, count) => {
    query.find();
    query.exec((err, users) => {
      if (users) {
        res.json({
          message: 'get users succeeded',
          data: users,
          count,
          result: true
        });
      } else {
        res.json({
          message: 'no user found',
          data: err,
          result: false
        });
      }
    });
  });
};
// 检测用户是否登录
exports.getSelf = (req, res) => {
  // console.log(req.cookies);
  // console.log('getSelf-session', req.session);
  if (!req.session.user) {
    res.json({
      message: '用户未登录',
      data: null,
      result: false
    });
  } else {
    User.findOne({ _id: req.session.user }).select({ __v: 0, password: 0 })
        .exec((err, user) => {
          if (user) {
            // console.log(req.cookies);
            require('./websocket_controller.js').addUser(user.username, user._id, req.cookies['connect.sid']);
            res.json({
              message: '用户存在',
              data: user,
              result: true
            });
          } else {
            res.json({
              message: '用户不存在',
              data: null,
              result: false
            });
          }
        });
  }
};

