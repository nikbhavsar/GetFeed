import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { getFollowingPoll } from '../../actions/poll';
import FriendsPollsItem from './FriendsPollsItem';
import Spinner from '../layout/Spinner';
import { v4 as uuid } from 'uuid';

const FriendsPolls = ({
  getFollowingPoll,
  poll: { loading, followingPolls },
}) => {
  const [friendsPolls, setFriendsPolls] = useState([]);
  const [count, setCount] = useState(false);

  useEffect(() => {
    getFollowingPoll();
  }, [count]);

  useEffect(() => {
    if (followingPolls) setFriendsPolls(followingPolls);
  }, [followingPolls]);

  const increment = () => {
    setCount((prevCount) => !prevCount);
  };
  return !loading && friendsPolls.length ? (
    <div className='poll-list-body'>
      <div className='poll-list-container'>
        {friendsPolls.map((poll) => (
          <FriendsPollsItem key={uuid()} pollData={poll} onClick={increment} />
        ))}
      </div>
    </div>
  ) : (
    <Spinner />
  );
};
const mapStateToProps = (state) => ({
  poll: state.poll,
});
export default connect(mapStateToProps, { getFollowingPoll })(FriendsPolls);
