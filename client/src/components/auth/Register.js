import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setAlert } from '../../actions/alert';

const Register = ({ setAlert }) => {
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
    setAlert('Password does not match', 'danger');
    console.log('success');
  };

  return (
    <div className='signup-login-container'>
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
              required
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
      <div className='image-section'>
        <Link to='/login' className='round-button redirect-button'>
          Login
        </Link>
      </div>
    </div>
  );
};

export default connect(null, { setAlert })(Register);
