import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  getFollowing,
  getFollowers,
} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Search from './Search';

const FollowType = ({
  getCurrentProfile,
  getFollowers,
  getFollowing,
  profile: { profiles, loading, profile },
  followType,
}) => {
  const [allProfile, setAllProfile] = useState([]);

  useEffect(() => {
    getCurrentProfile();
    if (profiles !== [] && profile !== null) {
      if (followType === 'following') {
        setAllProfile(getFollowing());
      } else {
        setAllProfile(getFollowers());
      }
    }
  }, [followType]);

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

export default connect(mapStateToProps, {
  getCurrentProfile,
  getFollowers,
  getFollowing,
})(FollowType);
