import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { addLike, unLike, getFollowingPoll } from '../../actions/poll';
import Spinner from '../layout/Spinner';

const FriendsPollsItem = ({ pollData, onClick, auth, addLike, unLike }) => {
  return pollData ? (
    <>
      {' '}
      <div className='poll-card-container'>
        <div className='user-info'>{pollData.name}</div>
        <div className='category-container poll-item poll-item-friends'>
          <div className='poll-item__question'>{pollData.question}</div>
          <div className='poll-item__friends-list'>
            {pollData.opinionImage1Likes.length +
              pollData.opinionImage2Likes.length}
            answers
          </div>
          <div className='poll-item__images'>
            <div className='poll-item__images__image-div'>
              <Image
                cloudName='daqdhcvyv'
                publicId={pollData.opinionImage1}
                width='100'
                height='100'
                crop='mfit'
                className='poll-image'
              />
              {pollData.opinionImage1Likes.some(
                (like) => like.user === auth.user._id
              ) ? (
                <FavoriteIcon
                  className='unlike-icon-friends'
                  onClick={(e) => {
                    unLike(pollData._id, 1);
                    onClick();
                  }}
                />
              ) : (
                <FavoriteIcon
                  className='like-icon-friends'
                  onClick={(e) => {
                    addLike(pollData._id, 1);
                    onClick();
                  }}
                />
              )}
            </div>
            <div className='poll-item__images__image-div'>
              <Image
                cloudName='daqdhcvyv'
                publicId={pollData.opinionImage2}
                width='100'
                height='100'
                crop='mfit'
                className='poll-image'
              />
              {pollData.opinionImage2Likes.some(
                (like) => like.user === auth.user._id
              ) ? (
                <FavoriteIcon
                  className='unlike-icon-friends'
                  onClick={(e) => {
                    unLike(pollData._id, 2);
                    onClick();
                  }}
                />
              ) : (
                <FavoriteIcon
                  className='like-icon-friends'
                  onClick={(e) => {
                    addLike(pollData._id, 2);
                    onClick();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, unLike, getFollowingPoll })(
  FriendsPollsItem
);
