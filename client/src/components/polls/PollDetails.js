import React, { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FriendsSection from '../dashboard/FriendsSection';
import UserVoteItem from './UserVoteItem';
import Divider from '@material-ui/core/Divider';

const PollDetails = (props) => {
  const [image1LikesArray, setimage1LikesArray] = useState([]);
  const [image2LikesArray, setimage2LikesArray] = useState([]);
  const {
    question,
    opinionImage1,
    opinionImage2,
    opinionImage1Likes,
    opinionImage2Likes,
  } = props.location.state.data;

  //Adding the image to Likes array to send it as props

  useEffect(() => {
    if (opinionImage1Likes.length) {
      setimage1LikesArray(
        opinionImage1Likes.map(({ user, date }) => {
          return { user: user, date: date, image: opinionImage1 };
        })
      );
    }
  }, [opinionImage1Likes]);

  useEffect(() => {
    if (opinionImage2Likes.length) {
      setimage2LikesArray(
        opinionImage2Likes.map(({ user, date }) => {
          return { user: user, date: date, image: opinionImage2 };
        })
      );
    }
  }, [opinionImage2Likes]);

  return (
    <div className='dashboard'>
      <div className='friends-section'>
        <FriendsSection />
      </div>
      <div className='friends-list-poll-section'>
        <div className='details-section'>
          <div className='poll-item__question details-section-margin'>
            {question}
          </div>
          <div className='poll-item__friends-list details-section-margin'>
            {opinionImage1Likes.length + opinionImage2Likes.length}
            {opinionImage1Likes.length + opinionImage2Likes.length === 1
              ? ' answer'
              : ' answers'}
          </div>
          <div className='poll-item-details__images'>
            <div className='poll-item-details__images__image-div'>
              <Image
                cloudName='daqdhcvyv'
                publicId={opinionImage1}
                width='120'
                height='120'
                crop='mfit'
                className='poll-image'
              />
              <div className='like-icon-section'>
                <FavoriteIcon className='like-icon' />
                {opinionImage1Likes.length}
              </div>
            </div>
            <div className='poll-item__images__image-div'>
              <Image
                cloudName='daqdhcvyv'
                publicId={opinionImage2}
                width='120'
                height='120'
                crop='mfit'
                className='poll-image'
              />
              <div className='like-icon-section'>
                <FavoriteIcon className='like-icon' />
                {opinionImage2Likes.length}
              </div>
            </div>
          </div>
        </div>
        <div className='user-vote-item-container details-section'>
          {[...image1LikesArray, ...image2LikesArray].length ? (
            //Combine the likes arrat and sort them by datetime
            [...image1LikesArray, ...image2LikesArray]
              .sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
              })
              .map((like) => (
                <>
                  <Divider />
                  <UserVoteItem likes={like} />
                </>
              ))
          ) : (
            <div className='not-found'>No votes found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollDetails;
