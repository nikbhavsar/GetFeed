import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { getFollowingPoll } from '../../actions/poll';
import FriendsPollsItem from './FriendsPollsItem';
import Spinner from '../layout/Spinner';
import { v4 as uuid } from 'uuid';
import FriendsSection from '../dashboard/FriendsSection';

const FriendsPolls = ({
  socket,
  getFollowingPoll,
  poll: { loading, followingPolls },
}) => {
  const [friendsPolls, setFriendsPolls] = useState([]);
  const [count, setCount] = useState(false);

  useEffect(() => {
    getFollowingPoll();
  }, [count]);

  useEffect(() => {
    if (socket) {
      socket.emit('login');
    } else {
      setTimeout(socket.emit('login'), 2000);
    }
  }, [socket]);

  useEffect(() => {
    if (followingPolls) setFriendsPolls(followingPolls);
  }, [followingPolls]);

  const increment = () => {
    setCount((prevCount) => !prevCount);
  };
  return !loading ? (
    <div className='dashboard'>
      <div className='friends-section'>
        <FriendsSection socket={socket} />
      </div>
      {friendsPolls.length ? (
        <div className='friends-list-poll-section'>
          <div className='poll-list-body'>
            <div className='poll-list-container'>
              {friendsPolls.map((poll) => (
                <FriendsPollsItem
                  key={uuid()}
                  pollData={poll}
                  onClick={increment}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='friends-list-poll-section not-found'>
          No polls found.
        </div>
      )}
    </div>
  ) : (
    <Spinner />
  );
};
const mapStateToProps = (state) => ({
  poll: state.poll,
});
export default connect(mapStateToProps, { getFollowingPoll })(FriendsPolls);
