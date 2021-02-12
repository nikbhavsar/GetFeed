import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { createProfile } from '../../actions/profile';

const Register = ({ setAlert, register, isAuthenticated, createProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    register(formData);
    console.log('success');
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='signup-login-container'>
      <Link to='/login' className='round-button redirect-button'>
        Login
      </Link>
      <div className='form-section'>
        <div className='form-container'>
          {' '}
          <form className='signup-login-form' onSubmit={(e) => onSubmit(e)}>
            <h1 className='tagline'>Create an account</h1>
            <label className='txt-field-label' for='name'>
              <b>Your Name</b>
            </label>
            <input
              type='text'
              placeholder='Enter Name'
              name='name'
              id='name'
              value={name}
              onChange={(e) => onChange(e)}
            />

            <label className='txt-field-label' for='email'>
              <b>Your Email</b>
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

            <label className='txt-field-label' for='password'>
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
            <div>
              <input
                type='checkbox'
                id='agree-checkbox'
                name='agree-checkbox'
                required
              />
              <label for='agree-checkbox' className='checkbox-label'>
                {' '}
                By signing up I agree with <span>terms and conditions</span>
              </label>
            </div>
            <button type='submit' className='round-button submit-button'>
              Create
            </button>
          </form>
        </div>
      </div>
      <div className='image-section'></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register, createProfile })(
  Register
);
