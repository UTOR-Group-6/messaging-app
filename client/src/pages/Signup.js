import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

import "./Signup.css"

const SignupForm = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [addUser] = useMutation(ADD_USER, {
    onError: (error) => {
      if (error.message.includes('E11000 duplicate key error collection')) {
        setErrorMessage('Sorry, that username or email is already taken.');
      }
    },
  });
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    if (!formState.username) {
      setErrorMessage('Please enter a username')
      return;
    } else if (!formState.email) {
      setErrorMessage('Please enter a valid email')
      return;
    } else if (!formState.password) {
      setErrorMessage('Please enter a password')
      return;
    }

    try {
      const mutationResponse = await addUser({
        variables: { 
          username: formState.username,
          email: formState.email, 
          password: formState.password,
        },
      });
      const token = mutationResponse.data.addUser.token;

      Auth.login(token)

    } catch (err) {
      console.error(err);
      return;
    }
    setFormState({
      username: '',
      email: '',
      password: ''
    });
    setErrorMessage('');
  };  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]:value
    });
    console.log(formState.username)
  };
  
  return (
    <div className="signup-div">
      <div className="form-div">
        <h2>Signup</h2>
        <form className="signup-form" onSubmit={handleFormSubmit}>
          <div className="username-div input-div">
            <input 
                type="username"
                name="username"
                id="username"
                placeholder="Username" 
                onChange={handleInputChange}
              />
          </div>
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
        
          {errorMessage && (
            <div>
              <p className="credentials-err">{errorMessage}</p>
            </div>
          )}
          
          <div className="submit-div">
            <button type="submit" className="signup-btn">Sign up</button>
          </div>

          <p className="redirect">Already have an account? <Link to="/login" className="login-link"><span>Login now</span></Link></p>
        </form>
      </div>
    </div>
  );
};
  
  export default SignupForm;
  