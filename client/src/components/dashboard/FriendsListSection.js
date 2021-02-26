import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import FriendsListModal from '../friends-list/FriendsListModel';
import { getCurrentProfile } from '../../actions/profile';
import { getCategory } from '../../actions/category';
import Spinner from '../layout/Spinner';
import FriendsListsSectionItem from './FriendsListsSectionItem';

const FriendsListSection = ({
  getCurrentProfile,
  getCategory,
  profile: { loading, profile },
  category: { category },
}) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [categories, setCategories] = useState([]);

  //Getting data fro FriendListSectionItem component

  useEffect(() => {
    if (profile !== null) {
      setCategories(profile.categories);
    }
  }, [profile]);

  const handleButtonClickOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  //Scrolling arrow functionality

  const sideScroll = (element, direction, speed, distance, step) => {
    let scrollAmount = 0;
    let slideTimer = setInterval(function () {
      if (direction === 'left') {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  };

  const nextScroll = (e) => {
    const container = document.querySelector('.card-list');
    sideScroll(container, 'right', 25, 100, 10);
  };

  const prevScroll = (e) => {
    const container = document.querySelector('.card-list');
    sideScroll(container, 'left', 25, 100, 10);
  };

  return (
    <>
      <div className='create-section'>
        <h1 className='create-section__heading'>Friends list</h1>
        <button
          className='round-button create-section__button'
          onClick={handleButtonClickOpen}>
          Create List
        </button>
      </div>
      <div className='card-section'>
        {!loading && profile !== null ? (
          categories.length !== 0 ? (
            <>
              <div className='arrow left' onClick={prevScroll}></div>
              <div className='card-list'>
                {profile.categories.map((currentCategory, index) => {
                  return (
                    <FriendsListsSectionItem
                      className='card-container'
                      key={`${currentCategory}${index}`}
                      category_id={currentCategory}
                    />
                  );
                })}
              </div>
              <div className='arrow right' onClick={nextScroll}></div>
            </>
          ) : (
            <div className='not-found'>No List found</div>
          )
        ) : (
          <Spinner />
        )}
      </div>
      <FriendsListModal open={modalOpen} onClose={handleModalClose} />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  category: state.category,
});

export default connect(mapStateToProps, { getCurrentProfile, getCategory })(
  FriendsListSection
);
