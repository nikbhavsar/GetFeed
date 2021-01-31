import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/Alert';
import './scss/styles.scss';

//Redux imports

import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Route exact path='/' component={Register} />
        <Alert />
        <Switch>
          <Route exact path='/login' component={Login} />{' '}
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
