import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import PollsItem from '../polls/PollsItem';

const PublicProfile = (props) => {
  const {
    avatar,
    polls,
    user,
    followers,
    following,
  } = props.location.state.data;
  return (
    <div className='public-profile-section'>
      <div className='user-info'>
        <div className='user-info__avatar'>
          {' '}
          <Avatar
            alt={user.name}
            src={avatar}
            className='user-avtar public-profile-avatar'
          />
        </div>
        <div className='user-info__details'>
          <div className='user-info__detais__name'>{user.name}</div>
          <div className='user-info__detais__followers-following'>
            <div className='user-info__detais__followers'>
              followers : <span> {followers.length}</span>
            </div>
            <div className='user-info__detais__following'>
              following: <span>{following.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='poll-list'>
        {polls.map((poll) => (
          <PollsItem key={poll} pollId={poll} />
        ))}
      </div>
    </div>
  );
};

export default PublicProfile;
