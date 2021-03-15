import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUserById } from '../../actions/auth';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import moment from 'moment';

const UserVoteItem = ({ likes, auth: { otherUser }, getUserById }) => {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const getUser = async (userId) => {
      const res = await axios.get(`/api/auth/${userId}`);
      if (res.status === 200) {
        setUserName(res.data.name);
      }
    };
    getUser(likes.user);

    console.log(userName);
  }, []);
  return (
    <>
      <div className='user-vote-item-section'>
        <div className='user-info'>
          <div className='avatar'></div>
          <div className='user-name'>
            <div>{userName} voted</div>
            <div className='time-info'>{moment(likes.date).fromNow()}</div>
          </div>
        </div>
        <div className='voted-image'>
          <Image
            cloudName='daqdhcvyv'
            publicId={likes.image}
            width='60'
            height='60'
            crop='mfit'
            className='poll-image'
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserById })(UserVoteItem);
