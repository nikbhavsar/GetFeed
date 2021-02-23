import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { createCategory } from '../../actions/category';

const CreateFriendsList = ({
  getProfiles,
  getCurrentProfile,
  createCategory,
  profile: { profiles, loading, profile },
  onClose,
  dispatch,
}) => {
  const [name, setName] = useState('');
  const [allProfile, setAllProfile] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getProfiles();
    getCurrentProfile();
    if (profiles !== [] && profile !== null) {
      setAllProfile(
        profiles.filter(
          (userProfile) =>
            profile.followers.includes(userProfile.user._id) &&
            userProfile.user._id !== profile.user._id
        )
      );
      console.log(allProfile);
    }
  }, [getProfiles]);

  const addUser = (userId) => {
    setUserList([...userList, userId]);
  };

  const handleOnClick = (name, friends) => {
    if (friends.length) {
      createCategory(name, friends);
    }
    onClose();
  };

  return loading || profiles === [] || profile === null ? (
    <Spinner />
  ) : (
    <>
      <div className='create-friends-list-container'>
        <h1 className='create-friends-list-container__heading'>
          Create a friend list
        </h1>
        <div>
          {' '}
          <input
            type='text'
            value={name}
            placeholder='Enter name of the list'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='feiends-list'>
          {allProfile.length > 0 && profile !== null ? (
            allProfile.map(
              (userProfile) =>
                userProfile.user !== null && (
                  <div className='friends-list-item'>
                    <div className='avatar-name-section'>
                      {userProfile.user.name}
                    </div>
                    <div>
                      {userList.length !== 0 &&
                      userList.includes(userProfile.user._id) ? (
                        <button className='round-button add-remove-button'>
                          Added
                        </button>
                      ) : (
                        <button
                          className='round-button add-remove-button'
                          onClick={() => addUser(userProfile.user._id)}>
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                )
            )
          ) : (
            <div>No profiles found</div>
          )}
        </div>
        <button
          className='round-button create-button'
          onClick={() => handleOnClick(name, userList)}>
          Create
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getProfiles,
  createCategory,
})(CreateFriendsList);
