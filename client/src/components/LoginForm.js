import React, { useEffect, useState } from 'react';

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [loginUser, {error}] = useMutation(LOGIN_USER);
  
    useEffect(() => {
      if (error) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    }, [error]);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserFormData({ ...userFormData, [name]: value });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      // check if form has everything (as per react-bootstrap docs)
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      try {
        const { data } = await loginUser({
          variables: { ...userFormData }
        });
  
        Auth.login(data.login.token)
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }
  
      setUserFormData({
        username: '',
        email: '',
        password: '',
      });
    };
  
    return (
      <div>
        <form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <input 
                type='text' 
                placeholder="Email Address" 
                name='email' 
                onChange={handleInputChange} 
                value={userFormData.email}>
            </input>
        
            <p className="alert-msg" onClose={() => setShowAlert(false)} show={showAlert}>Sorry, please try again.</p>

        </form>
      </div>
    );
  };
  
  export default LoginForm;
  