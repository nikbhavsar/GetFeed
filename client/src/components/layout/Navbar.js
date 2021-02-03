import { MongooseDocument } from 'mongoose';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    setIsClicked(!isClicked);
  };

  if (isAuthenticated) {
    return (
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
          <ul>
            <li onClick={(e) => handleClick(e)}>
              <a href='#'>Friends</a>
            </li>
            <li onClick={(e) => handleClick(e)}>
              <a href='#'>Friends Polls</a>
            </li>
            <li onClick={(e) => handleClick(e)}>
              <a href='#'>Opinions</a>
            </li>
            <li onClick={(e) => handleClick(e)}>
              <a href='#'>Create Poll</a>
            </li>
            <li onClick={(e) => handleClick(e)}>
              <Link to='/' onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    return <></>;
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
