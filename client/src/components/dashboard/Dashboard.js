import React, { Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { getCurrentProfile } from '../../actions/profile';
import FriendsListSection from './FriendsListSection';
import FriendsSection from './FriendsSection';
import PollSection from './PollSection';

const Dashboard = ({ socket, getCurrentProfile, auth: { user }, profile }) => {
  useEffect(() => {
    if (socket) {
      socket.emit('login');
    } else {
      setTimeout(socket.emit('login'), 2000);
    }
  }, [socket]);

  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <>
      <div className='dashboard'>
        <div className='friends-section'>
          <FriendsSection socket={socket} />
        </div>
        <div className='friends-list-poll-section'>
          <div className='poll-section'>
            {' '}
            <PollSection />
          </div>
          <div className='friend-section'>
            <FriendsListSection />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
