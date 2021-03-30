import React, { useEffect, useState } from 'react';
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
import Avatar from '@material-ui/core/Avatar';

const FriendsListsSectionItem = ({
  category_id,
  profile: { profile, profiles, loading },
  deleteCategory,
  removeUserFromCategory,
  dispatch,
}) => {
  const [categoryItem, setCategoryItem] = useState({});
  const [friends, setFriends] = useState([]);

  useEffect(async () => {
    //Get the category by Id
    try {
      const res = await axios.get(`/api/category/${category_id}`);

      if (res.status === 200) {
        setCategoryItem(res.data);
        const filtered = profiles.filter((userProfile) =>
          res.data.friends.includes(userProfile.user._id)
        );

        setFriends(filtered);
      }
    } catch (err) {
      console.error(err);
    }
  }, [category_id]);

  const handleDelete = (friend) => {
    removeUserFromCategory(category_id, friend.user._id);
    if (friends.length > 1) {
      setFriends(
        friends.filter(
          (currentFriends) => currentFriends.user._id !== friend.user._id
        )
      );
    }
  };

  return !loading && categoryItem !== null && friends.length > 0 ? (
    <div className='category-container'>
      <div className='category-info'>
        <div className='category-name'>
          <p className='category-name__name'>{categoryItem.category_name}</p>
          <div>
            <div className='category-name__friends-count'>
              {friends.length}
              {friends.length === 1 ? (
                <span> friend</span>
              ) : (
                <span> friends</span>
              )}
            </div>
          </div>
        </div>
        <div className='category-info__settings-symbol'>
          <DeleteRoundedIcon
            onClick={(e) => {
              deleteCategory(category_id);
            }}
            className='setting-icon'
          />
        </div>
      </div>
      <div className='friends-list'>
        {friends.map((friend, index) => {
          return (
            <div key={index} className='friends-list_list-item'>
              <ClearIcon
                onClick={() => handleDelete(friend)}
                className='clear-icon'
              />
              <Avatar
                alt={friend.user.name}
                src={`https://res.cloudinary.com/daqdhcvyv/image/upload/v1615793443/${friend.avatar}`}
                className='user-avtar'
              />
              <div className='friends-list_list-item__name'>
                {friend.user.name}
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
