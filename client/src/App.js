import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertDiv from './components/AlertDiv';
import './scss/styles.scss';
import Navbar from './components/layout/Navbar';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import FriendsPolls from './components/polls/FriendsPolls';
import PrivateRoute from './components/routing/PrivateRoute';

//Redux imports

import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { loadUser } from './actions/auth';
import Profiles from './components/profile/Profiles';
import { PersistGate } from 'redux-persist/integration/react';
import PollDetails from './components/polls/PollDetails';
import PublicProfile from './components/profile/PublicProfile';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {' '}
        <Router>
          <Fragment>
            <Navbar></Navbar>
            <AlertDiv />
            <Route exact path='/' component={Register} />
            <Switch>
              <Route exact path='/login' component={Login} />{' '}
              <PrivateRoute exact path='/friends' component={Profiles} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                path='/poll-details'
                exact
                component={PollDetails}
              />
              <PrivateRoute
                exact
                path='/friends-polls'
                component={FriendsPolls}
              />
              <PrivateRoute path='/profile' exact component={PublicProfile} />
            </Switch>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
