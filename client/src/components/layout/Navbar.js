import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import FriendsModal from './FriendsModal';
import { getCurrentProfile } from '../../actions/profile';
import UpdateProfileModal from '../profile/UpdatePeofileModal';

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  getCurrentProfile,
  profile: { profile },
  logout,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [image, setImage] = useState('');
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);

  const anchorRef = React.useRef(null);

  useEffect(() => {
    if (profile) setImage(profile.avatar);
  }, [profile]);

  //Avtar Menu functios

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleClick = (e) => {
    setIsClicked(!isClicked);
  };

  //Modal Open and Click function

  const handleButtonClickOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  //Update Modal Open and Click function

  const handleUpdateButtonClickOpen = () => {
    setUpdateModalOpen(true);
  };

  if (isAuthenticated) {
    return (
      <div className='nav-container'>
        <nav className='navbar'>
          <div className='brandTitle'>
            <Link to='/dashboard'>GetFeed</Link>
          </div>
          <a
            href='#'
            className={'navbarToggler ' + (isClicked ? 'active' : null)}
            onClick={(e) => handleClick(e)}>
            <span className='iconBar'></span>
            <span className='iconBar'></span>
            <span className='iconBar'></span>
          </a>
          <div className={'navbarLinks ' + (isClicked ? null : 'collapse')}>
            <ul className='nav-items-ul'>
              <li onClick={(e) => handleClick(e)}>
                <button onClick={handleButtonClickOpen}>Friends</button>
              </li>
              <li onClick={(e) => handleClick(e)}>
                <Link to='/friends-polls'>Friends Polls</Link>
              </li>
              <li onClick={(e) => handleClick(e)}>
                <a href='#'>Opinions</a>
              </li>
              <li onClick={(e) => handleClick(e)}>
                <a href='#' className='round-button create-poll'>
                  Create Poll
                </a>
              </li>
              <li onClick={(e) => handleClick(e)}>
                <Avatar
                  alt={user.name}
                  src={image}
                  ref={anchorRef}
                  className='avtar'
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup='true'
                  onClick={handleToggle}
                />
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom'
                            ? 'center top'
                            : 'center bottom',
                      }}>
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id='menu-list-grow'
                            onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={handleUpdateButtonClickOpen}>
                              My account
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleClick();
                                logout();
                              }}>
                              Logout
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </li>
            </ul>
          </div>
        </nav>
        <FriendsModal open={modalOpen} onClose={handleModalClose} />
        <UpdateProfileModal
          open={updateModalOpen}
          handleClose={() => {
            setUpdateModalOpen(false);
            handleClick();
          }}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, getCurrentProfile })(Navbar);
