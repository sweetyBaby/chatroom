import React from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

import Main from './containers/app';
import Login from './containers/login';
import Register from './containers/register';

const App = (
  <Router history={browserHistory}>
    <Route path="/" component={Main} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
  </Router>
  );
export default App;
