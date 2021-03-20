import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getProfiles, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Avatar from '@material-ui/core/Avatar';

const FriendSection = ({
  getProfiles,
  getCurrentProfile,
  profile: { profiles, loading, profile },
}) => {
  const [allProfile, setAllProfile] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getProfiles();
    getCurrentProfile();
    if (profiles !== [] && profile !== null) {
      setAllProfile(
        profiles.filter(
          (userProfile) =>
            profile.followers.includes(userProfile.user._id) ||
            (profile.following.includes(userProfile.user._id) &&
              userProfile.user._id !== profile.user._id)
        )
      );
    }
  }, [getProfiles, getCurrentProfile]);

  return loading && profiles === [] && profile === null ? (
    <Spinner />
  ) : (
    <div className='profiles'>
      <h1 className='profiles__heading'>Friends</h1>
      {allProfile.length > 0 && profile !== null ? (
        allProfile.map(
          (userProfile) =>
            userProfile.user !== null && (
              <div
                key={userProfile.user._id}
                className='profile-name'
                onClick={() => {
                  history.push({
                    pathname: '/profile',
                    state: { data: userProfile },
                  });
                }}>
                <Avatar
                  alt={userProfile.user.name}
                  src={`https://res.cloudinary.com/daqdhcvyv/image/upload/v1615793443/${userProfile.avatar}`}
                  className='user-avtar'
                />
                <> {userProfile.user.name} </>
              </div>
            )
        )
      ) : (
        <div>No profiles found</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles, getCurrentProfile })(
  FriendSection
);
