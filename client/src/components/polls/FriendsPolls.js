import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { getFollowingPoll } from '../../actions/poll';
import FriendsPollsItem from './FriendsPollsItem';
import Spinner from '../layout/Spinner';

const FriendsPolls = ({
  getFollowingPoll,
  poll: { loading, followingPolls },
}) => {
  const [friendsPolls, setfriendsPolls] = useState([]);
  const [count, setCount] = useState(false);

  useEffect(() => {
    getFollowingPoll();
    if (followingPolls) setfriendsPolls(followingPolls);
  }, [followingPolls]);

  const increment = () => {
    setCount(!count);
  };
  return !loading && friendsPolls.length ? (
    <div className='poll-list-body'>
      <div className='poll-list-container'>
        {friendsPolls.map((poll) => (
          <FriendsPollsItem
            key={poll._id}
            pollData={poll}
            onClick={increment}
          />
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
