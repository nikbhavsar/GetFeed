import React, { useState } from 'react';
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

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isClicked, setIsClicked] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const anchorRef = React.useRef(null);

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

  if (isAuthenticated) {
    return (
      <div className='nav-container'>
        <nav className='navbar'>
          <div className='brandTitle'>GetFeed</div>
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
                <a href='#'>Friends Polls</a>
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
                  alt='Travis Howard'
                  src='/static/images/avatar/2.jpg'
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
                            <MenuItem onClick={handleClose}>
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
      </div>
    );
  } else {
    return <></>;
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
