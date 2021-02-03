import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertDiv from './components/AlertDiv';
import './scss/styles.scss';
import Navbar from './components/layout/Navbar';
import setAuthToken from './utils/setAuthToken';

//Redux imports

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar></Navbar>
          <AlertDiv />
          <Route exact path='/' component={Register} />
          <Switch>
            <Route exact path='/login' component={Login} />{' '}
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
