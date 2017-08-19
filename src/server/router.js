const users = require('./controller/user_controller');

module.exports = (app) => {
  app.get('/logout', (res, req) => { // logout
    req.session.destroy(() => {
      res.redirect('/');
    });
  });

  // api
  app.post('/api/user/register', users.register);
  app.post('/api/user/login', users.login);

  app.get('/api/self', users.getSelf);
  app.get('/api/users', users.getUsers);
  app.get('/api/user/exist', users.userExist);
};
