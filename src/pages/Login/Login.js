import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import authService from '../../authService'; // Adjust the path as necessary
import './Login.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message

    // Check for hardcoded admin credentials
    if (username === 'admin' && password === 'admin') {
      // Redirect to home if credentials match
      navigate('/home');
      return;
    }

    try {
      const response = await authService.login(username, password);
      localStorage.setItem('token', response.data.token);
      navigate('/home'); // Redirect to home after successful login
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {message && <p className="login-message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
