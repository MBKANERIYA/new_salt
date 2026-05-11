import API_BASE_URL from '../Utils/apiConfig.js';
import React, { useState } from 'react';
// import { AuthContext } from '../context/AuthContext';  // Import the context
import axios from 'axios';

function LoginUser() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  }); // Destructure the login function from context

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
      // Set JWT token in localStorage
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful!');
      // You can redirect the user to another page or perform other actions
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginUser;
