import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getProfiles, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const FriendSection = ({
  getProfiles,
  getCurrentProfile,
  profile: { profiles, loading, profile },
}) => {
  const [allProfile, setAllProfile] = useState([]);

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
  }, []);

  return loading && profiles === [] && profile === null ? (
    <Spinner />
  ) : (
    <div className='profiles'>
      <h1 className='profiles__heading'>Friends</h1>
      {allProfile.length > 0 && profile !== null ? (
        allProfile.map(
          (userProfile) =>
            userProfile.user !== null && (
              <div key={userProfile.user._id} className='profile-name'>
                {' '}
                {userProfile.user.name}
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
