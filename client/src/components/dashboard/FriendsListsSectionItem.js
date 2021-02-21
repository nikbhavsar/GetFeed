import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import {
  getCategory,
  deleteCategory,
  removeUserFromCategory,
} from '../../actions/category';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import ClearIcon from '@material-ui/icons/Clear';

const FriendsListsSectionItem = ({
  category_id,
  profile: { profiles },
  deleteCategory,
  removeUserFromCategory,
  dispatch,
}) => {
  const [categoryItem, setcategoryItem] = useState({});
  const [friends, setFriends] = useState([]);

  useEffect(async () => {
    //Get the category by Id
    try {
      const res = await axios.get(`/api/category/${category_id}`);

      if (res.data) {
        setcategoryItem(res.data);
        const filtered = profiles.filter((userProfile) =>
          res.data.friends.includes(userProfile.user._id)
        );

        setFriends(filtered);
      }
      // dispatch({ type: CLEAR_CATEGORY });
    } catch (err) {
      console.error(err);
    }
  }, [category_id]);

  return categoryItem !== null && friends.length > 0 ? (
    <div className='category-container'>
      <div className='category-info'>
        <div className='category-name'>
          <p className='category-name__name'>{categoryItem.category_name}</p>
          <p>
            {friends.length === 1 ? (
              <div className='category-name__friends-count'>
                {friends.length} friend
              </div>
            ) : (
              <div className='category-name__friends-count'>
                {friends.length} friends
              </div>
            )}
          </p>
        </div>
        <div className='category-info__settings-symbol'>
          <DeleteRoundedIcon
            onClick={(e) => {
              //  handleCardDelete(category_id);
              deleteCategory(category_id);
            }}
            className='setting-icon'
          />
        </div>
      </div>
      <div className='friends-list'>
        {' '}
        {friends.map((friend) => {
          return (
            <div className='friends-list_list-item'>
              <ClearIcon
                onClick={(e) => {
                  removeUserFromCategory(category_id, friend.user._id);
                  if (friends.length > 1) {
                    setFriends(
                      friends.filter(
                        (currentFriends) =>
                          currentFriends.user._id !== friend.user._id
                      )
                    );
                  }
                }}
                className='clear-icon'
              />
              <div className='friends-list_list-item__name'>
                {' '}
                {friend.user.name}{' '}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCategory,
  deleteCategory,
  removeUserFromCategory,
})(FriendsListsSectionItem);
