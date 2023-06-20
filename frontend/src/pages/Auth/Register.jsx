import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:3002/users/register', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.status === 201) {
        toast.success('Registration Successful!');
        // Redirect to login page
        navigate('/success');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during registration.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
        />
        <button type='submit'>Register</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
