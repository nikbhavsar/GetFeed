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

  //Setting state for Getting data fro FriendListSectionItem component

  // const [itemDeleted, setItemDeleted] = useState(null);

  useEffect(() => {
    if (profile !== null) {
      setCategories(profile.categories);
    }
  }, []);

  const handleButtonClickOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  //Scrolling arrow functionality

  const sideScroll = (element, direction, speed, distance, step) => {
    var scrollAmount = 0;
    var slideTimer = setInterval(function () {
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
    var container = document.querySelector('.card-list');
    sideScroll(container, 'right', 25, 100, 10);
    console.log(container.offsetWidth);
  };

  const prevScroll = (e) => {
    var container = document.querySelector('.card-list');
    sideScroll(container, 'left', 25, 100, 10);
    console.log(container.offsetWidth);
  };

  // //Getting data fro FriendListSectionItem component

  // const handleCardDelete = (categoryId) => {
  //   console.log(categoryId);
  //   setCategories(
  //     categories.filter((category) => {
  //       console.log(category);
  //       return category !== categoryId;
  //     })
  //   );
  // };

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
        {profile !== null ? (
          categories.length ? (
            <>
              <div class='arrow left' onClick={prevScroll}></div>
              <div className='card-list'>
                {profile.categories.map((currentCategory, index) => {
                  return (
                    <FriendsListsSectionItem
                      className='card-container'
                      key={`${currentCategory}${index}`}
                      category_id={currentCategory}
                      //  handleCardDelete={handleCardDelete}
                    />
                  );
                })}
              </div>
              <div class='arrow right' onClick={nextScroll}></div>
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
