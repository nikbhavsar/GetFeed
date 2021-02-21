import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import FriendsListSection from './FriendsListSection';
import FriendsSection from './FriendsSection';
import PollSection from './PollSection';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <>
      <div className='dashboard'>
        <div className='friends-section'>
          <FriendsSection />
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
