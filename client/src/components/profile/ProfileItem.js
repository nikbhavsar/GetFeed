import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/profile';
import { Button } from '@material-ui/core';

const ProfileItem = ({
  profile: {
    user: { _id, name },
  },
  loginUser,
  followUser,
  unFollowUser,
}) => {
  return (
    <div className='profile bg-light'>
      <div className='profile-item'>
        <div className='avtar-name-section'>
          {' '}
          <h2>{name}</h2>
        </div>

        <div className='follow-unfollow-button-section'>
          {' '}
          {!loginUser.following.includes(_id) ? (
            <button
              className='follow-button round-button'
              onClick={(e) => {
                e.preventDefault(e);
                followUser(_id);
              }}>
              Follow
            </button>
          ) : (
            <button
              className='unfollow-button round-button'
              onClick={(e) => {
                e.preventDefault(e);
                unFollowUser(_id);
              }}>
              UnFollow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(null, { followUser, unFollowUser })(ProfileItem);
