import React, { useEffect, useState, useRef, useReducer } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getProfiles, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const StyledBadge2 = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid #44b700',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const FriendSection = ({
  socket,
  getProfiles,
  getCurrentProfile,
  profile: { profiles, loading, profile },
}) => {
  const [allProfile, setAllProfile] = useState([]);
  const history = useHistory();
  const [userList, setUserList] = useState([]);
  const [, forceUpdate] = useState();

  useEffect(() => {
    if (socket) {
      socket.on('userStatus', (message) => {
        setUserList(message.users);
      });
    }
    setTimeout(forceUpdate, 2000);
  }, [socket, setUserList]);

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
                <Box display='flex'>
                  <Box m={1}>
                    {userList.includes(userProfile.user._id) ? (
                      <StyledBadge2
                        overlap='circle'
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant='dot'>
                        <Avatar
                          alt={userProfile.user.name}
                          src={userProfile.avatar}
                        />
                      </StyledBadge2>
                    ) : (
                      <Avatar
                        alt={userProfile.user.name}
                        src={userProfile.avatar}
                      />
                    )}
                  </Box>
                </Box>

                <>{userProfile.user.name}</>
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
