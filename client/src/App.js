import React, { Fragment, useEffect, useState } from 'react';
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
import io from 'socket.io-client';
import Spinner from './components/layout/Spinner';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [socket, setSocket] = React.useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem('token');
    if (token && !socket) {
      const newSocket = io('http://localhost:5000', {
        query: {
          token: localStorage.getItem('token'),
        },
      });
      newSocket.emit('connection');

      newSocket.on('disconnect', () => {
        setSocket(null);
        setTimeout(setupSocket, 1000);
      });

      newSocket.on('connect', () => {
        console.log('connected');
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    setupSocket();
    console.log(socket);
    //eslint-disable-next-line
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Fragment>
            <Navbar socket={socket}></Navbar>
            <AlertDiv />
            <Route exact path='/' component={Register} />
            <Switch>
              <Route
                path='/login'
                render={() => <Login setupSocket={setupSocket} />}
                exact
              />
              <PrivateRoute exact path='/friends' component={Profiles} />
              <PrivateRoute
                exact
                path='/dashboard'
                socket={socket}
                component={Dashboard}
              />
              <PrivateRoute
                path='/poll-details'
                exact
                component={PollDetails}
              />
              <PrivateRoute
                exact
                path='/friends-polls'
                socket={socket}
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
