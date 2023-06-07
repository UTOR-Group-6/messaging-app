import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';

import "./Login.css"

const LoginForm = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER); // if error in mutation, populates error message
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // take input values as args for LOGIN_USER mutation
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;

      Auth.login(token)

    } catch (err) {
      console.error(err);
      return;
    }

    // clear form after sucessful login
    setFormState({
      email: '',
      password: ''
    });
  };  

  // save input values into states to access them
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]:value
    });
  };
  
  return (
    <div className="login-div">
      <div className="login-welcome">
        <h1 className="app-title">Welcome to Aqua</h1>
        <p className="app-tagline">Your favourite ocean themed chat room</p>
      </div>
      <div className="form-div">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleFormSubmit}>
          <div className="email-div input-div">
            <input 
                type="email"
                name="email"
                id="email"
                placeholder="Email Address" 
                onChange={handleInputChange} 
              />
          </div>
          <div className="password-div input-div">
            <input 
                type="password"
                name="password"
                id="pwd"
                placeholder="Password" 
                onChange={handleInputChange} 
              />
          </div>
        
          {error ? (
            <div>
              <p className="credentials-err">Incorrect email or password. Please try again!</p>
            </div>
          ) : null}
          
          <div className="submit-div">
            <button type="submit" className="login-btn">Login</button>
          </div>

          <p className="redirect">Don't have an account? <Link to="/signup" className="signup-link"><span>Signup now</span></Link></p>
        </form>
      </div>
    </div>
  );
};
  
  export default LoginForm;
  