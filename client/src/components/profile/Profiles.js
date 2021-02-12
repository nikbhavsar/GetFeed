import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getProfiles, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import Search from './Search';

const Profiles = ({
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
          (userProfile) => userProfile.user._id !== profile.user._id
        )
      );
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
  Profiles
);
