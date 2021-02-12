import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getProfiles, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Search from './Search';

const FollowType = ({
  getProfiles,
  getCurrentProfile,
  profile: { profiles, loading, profile },
  followType,
}) => {
  const [allProfile, setAllProfile] = useState([]);

  useEffect(() => {
    getProfiles();
    getCurrentProfile();
    if (profiles !== [] && profile !== null) {
      setAllProfile(
        profiles.filter(
          (userProfile) =>
            profile[followType].includes(userProfile.user._id) &&
            userProfile.user._id !== profile.user._id
        )
      );
      console.log(followType);
    }
  }, [getProfiles]);

  return loading || profiles === [] || profile === null ? (
    <Spinner />
  ) : (
    <Search allProfile={allProfile} profile={profile} />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles, getCurrentProfile })(
  FollowType
);
