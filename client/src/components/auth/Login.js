import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
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
    console.log('success');
  };

  return (
    <div>
      <div className='signup-login-container'>
        <div className='form-section'>
          <div className='form-container'>
            {' '}
            <form className='signup-login-form' onSubmit={(e) => onSubmit(e)}>
              <h1 className='tagline'>Log In</h1>
              <label className='txt-field-label' for='email'>
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
              <button type='submit' className='round-button submit-button'>
                Login
              </button>
            </form>
          </div>
        </div>
        <div className='image-section'>
          <Link to='/' className='round-button redirect-button'>
            signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
