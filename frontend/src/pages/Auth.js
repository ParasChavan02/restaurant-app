import React, { useState } from 'react';
import api from '../api/apiClient'; // Import the real API client

// Auth Component (Login/Signup)
const Auth = ({ setIsLoggedIn, setAuthUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const response = await api.loginUser({ email: formData.email, password: formData.password });
        setMessage(response.message || 'Login successful!');
        setMessageType('success');
        setIsLoggedIn(true);
        setAuthUser(response.user);
      } else {
        const response = await api.registerUser({ name: formData.name, email: formData.email, password: formData.password });
        setMessage(response.message || 'Signup successful! You can now log in.');
        setMessageType('success');
        setIsLogin(true); // Switch to login after successful signup
      }
      setFormData({ name: '', email: '', password: '', confirmPassword: '' }); // Clear form
    } catch (error) {
      setMessage(error.message || 'An error occurred.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 mt-16">
      <h2 className="text-5xl font-extrabold text-center text-text-primary mb-12">
        {isLogin ? 'Login' : 'Create Account'}
      </h2>
      <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-custom border border-card">
        <div className="flex justify-center mb-8 gap-1">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`px-8 py-3 font-semibold rounded-l-full transition-all duration-300 shadow-md ${
              isLogin 
                ? 'bg-accent text-white scale-105 shadow-lg' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`px-8 py-3 font-semibold rounded-r-full transition-all duration-300 shadow-md ${
              !isLogin 
                ? 'bg-accent text-white scale-105 shadow-lg' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-6">
              <label htmlFor="auth-name" className="block text-text-primary text-sm font-bold mb-2">Name</label>
              <input type="text" id="auth-name" name="name" value={formData.name} onChange={handleChange} required={!isLogin}
                className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight" />
            </div>
          )}
          <div className="mb-6">
            <label htmlFor="auth-email" className="block text-text-primary text-sm font-bold mb-2">Email</label>
            <input type="email" id="auth-email" name="email" value={formData.email} onChange={handleChange} required
              className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight" />
          </div>
          <div className="mb-6">
            <label htmlFor="auth-password" className="block text-text-primary text-sm font-bold mb-2">Password</label>
            <input type="password" id="auth-password" name="password" value={formData.password} onChange={handleChange} required
              className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight" />
          </div>
          {!isLogin && (
            <div className="mb-8">
              <label htmlFor="auth-confirm-password" className="block text-text-primary text-sm font-bold mb-2">Confirm Password</label>
              <input type="password" id="auth-confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required={!isLogin}
                className="input-field shadow appearance-none rounded-md w-full py-3 px-4 leading-tight" />
            </div>
          )}
          <div className="text-center">
            <button 
              type="submit" 
              disabled={loading} 
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full"
            >
              <span>{loading ? (isLogin ? 'Logging In...' : 'Signing Up...'): (isLogin ? 'Login' : 'Signup')}</span>
            </button>
          </div>
        </form>
        {message && (
          <div className={`mt-6 p-4 rounded-md text-center ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
