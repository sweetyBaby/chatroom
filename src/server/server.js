const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')({ session: expressSession });


const db = mongoose.connect('mongodb://mumumuxi:meng1314520@localhost/chatroom');
const app = express();

app.set('trust proxy', 1);
app.use(expressSession({
  secret: 'LALALAKAKAKA',
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions'
  }),
  resave: false,
  saveUninitialized: true
}));

mongoose.Promise = global.Promise;

require('./models/user_models');
require('./models/chat_models');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
// app.use(express.favicon());


app.use(express.static('static'));
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

require('./router')(app);

const port = process.env.PORT ? process.env.PORT : 8181;
const dist = path.join(__dirname, '../../dist');

app.get('*', (req, res) => {
  // res.end('hello')
  res.sendFile(path.join(dist, 'index.html'));
});

require('./controller/websocket_controller.js').createServer(app, port);

// app.listen(port, (error) => {
//   if (error) {
//     console.log(error); // eslint-disable-line no-console
//   }
//   console.info('Express is listening on port %s.', port); // eslint-disable-line no-console
// });
