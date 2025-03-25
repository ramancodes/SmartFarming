import React, { useContext, useEffect, useState } from 'react';
import { Mail, User, Phone, MapPin, Calendar, Clock, Edit2, LogOut, X, Check } from 'lucide-react';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';

const UserProfile = () => {
  const { user, setUser, getUserProfile, BACKEND_URL, token, setToken } = useContext(AppContext)
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedProfile, setEditedProfile] = useState(user);

  const formatedDate = (oldDate) => {
    const date = new Date(oldDate)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false)
  }

  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (user) {
      setEditedProfile(user)
    }
  }, [user])

  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', editedProfile.email);
      formData.append('name', editedProfile.name);
      formData.append('gender', editedProfile.gender);
      formData.append('phoneNo', editedProfile.phoneNo);
      formData.append('location', editedProfile.location);
      formData.append('dob', editedProfile.dob);

      await axios.post(BACKEND_URL + '/update_user', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      getUserProfile();
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(user);
    setIsEditing(false);
  };

  const renderField = (key, icon, label, type = 'text', editable = true, options = null) => {
    const Icon = icon;
    return (
      <div 
        key={key} 
        className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4 
        transform transition-all duration-300 hover:shadow-lg"
      >
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-grow">
          <label className="block text-xs text-gray-500 mb-1">{label}</label>
          {isEditing && editable ? (
            options ? (
              <select
                name={key}
                value={editedProfile[key]}
                onChange={handleChange}
                className="w-full bg-transparent text-base outline-none"
              >
                {options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={key}
                value={editedProfile[key]}
                onChange={handleChange}
                className="w-full bg-transparent text-base outline-none"
                placeholder={`Enter ${label}`}
              />
            )
          ) : (
            <p className={`text-base ${!editable ? 'text-gray-500' : ''}`}>
              {key === 'dob' || key === 'registeredOn' 
                ? formatedDate(user[key]) 
                : user[key] || 'Not specified'}
            </p>
          )}
        </div>
        {isEditing && editable && (
          <div className="text-green-500">
            <Edit2 className="w-5 h-5" />
          </div>
        )}
      </div>
    );
  };

  const fields = [
    { key: 'email', icon: Mail, label: 'Email', type: 'email', editable: false },
    { key: 'name', icon: User, label: 'Name' },
    { 
      key: 'gender', 
      icon: User, 
      label: 'Gender', 
      options: ['Select', 'Male', 'Female', 'Other']
    },
    { key: 'phoneNo', icon: Phone, label: 'Phone Number', type: 'tel' },
    { key: 'location', icon: MapPin, label: 'Location' },
    { key: 'dob', icon: Calendar, label: 'Date of Birth', type: 'date' },
    { key: 'registeredOn', icon: Clock, label: 'Registered On', editable: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 pt-14 pb-24">
      {/* Header */}
      <div className="fixed top-14 left-0 right-0 z-20 bg-white shadow-md">
        <div className="max-w-lg mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800 flex items-center">
            <User className="mr-3 text-green-600" /> Profile
          </h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
            >
              <Edit2 />
            </button>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-lg mx-auto px-4 space-y-4 mt-24">
        {/* Profile Picture Placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-green-200 rounded-full flex items-center justify-center">
            <User className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Profile Fields */}
        <div className="space-y-4">
          {fields.map(field => 
            renderField(
              field.key, 
              field.icon, 
              field.label, 
              field.type, 
              field.editable ?? true, 
              field.options
            )
          )}
        </div>
      </div>

      {/* Edit Mode Footer */}
      {isEditing && (
        <div className="fixed bottom-15 left-0 right-0 bg-white shadow-2xl p-4">
          <div className="max-w-lg mx-auto flex space-x-4">
            <button
              onClick={handleCancel}
              className="flex-1 bg-red-50 text-red-600 p-3 rounded-full flex items-center justify-center space-x-2 hover:bg-red-100 transition-colors"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-green-500 text-white p-3 rounded-full flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors"
            >
              {isLoading ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Logout Footer */}
      {token && !isEditing && (
        <div className="fixed bottom-14 left-0 right-0 bg-white shadow-2xl p-4">
          <div className="max-w-lg mx-auto">
            <button
              onClick={logout}
              className="w-full bg-red-50 text-red-600 p-3 rounded-full flex items-center justify-center space-x-2 hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;