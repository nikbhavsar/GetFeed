import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated, setupSocket }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    setupSocket();
    return <Redirect to='/dashboard' />;
  }
  return (
    <div>
      <div className='signup-login-container'>
        <Link to='/' className='round-button redirect-button'>
          signup
        </Link>
        <div className='form-section'>
          <div className='form-container'>
            {' '}
            <form className='signup-login-form' onSubmit={(e) => onSubmit(e)}>
              <h1 className='tagline'>Log In</h1>
              <div>
                <label className='txt-field-label' htmlFor='email'>
                  <b>Email Address</b>
                </label>
                <input
                  type='email'
                  placeholder='Enter Email'
                  name='email'
                  id='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div>
                <label className='txt-field-label' htmlFor='password'>
                  <b>Password</b>
                </label>
                <input
                  type='password'
                  placeholder='Enter Password'
                  name='password'
                  id='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <button type='submit' className='round-button submit-button'>
                Login
              </button>
            </form>
          </div>
        </div>
        <div className='image-section'></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
