import { MongooseDocument } from 'mongoose';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isClicked, setIsClicked] = useState(true);

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);
  };

  if (isAuthenticated) {
    return (
      <nav className='navbar'>
        <div className='brandTitle'>GetFeed</div>
        <a
          href='#'
          className={'navbarToggler ' + (isClicked ? 'active' : null)}
          onClick={handleClick}>
          <span className='iconBar'></span>
          <span className='iconBar'></span>
          <span className='iconBar'></span>
        </a>
        <div className={'navbarLinks ' + (isClicked ? null : 'collapse')}>
          <ul>
            <li onClick={handleClick}>
              <a href='#'>Friends</a>
            </li>
            <li onClick={handleClick}>
              <a href='#'>Friends Polls</a>
            </li>
            <li onClick={handleClick}>
              <a href='#'>Opinions</a>
            </li>
            <li onClick={handleClick}>
              <a href='#'>Create Poll</a>
            </li>
            <li onClick={handleClick}>
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
