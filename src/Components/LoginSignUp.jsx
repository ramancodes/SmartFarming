import React, { useContext, useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthForm = () => {
  const {token, setToken, BACKEND_URL, getUserProfile} = useContext(AppContext)
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    let response;
    if(isLogin){
      // login
      delete formData.name;
      response = await axios.post(BACKEND_URL+'/login_user', formData, {
        headers: {
          'Content-Type': 'application/json'
      }});

      if(response.data.success===true){
        localStorage.setItem('token', response.data.token)
        setToken(response.data.token)
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } else {
      // register
      response = await axios.post(BACKEND_URL+'/register_user', formData, {
        headers: {
          'Content-Type': 'application/json'
      }});

      if(response.data.success===true){
        setIsLogin(true);
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password || ''}
              onChange={handleChange}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-green-600 font-semibold hover:text-green-700"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;