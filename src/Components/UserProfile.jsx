import React, { useContext, useEffect, useState } from 'react';
import { Mail, User, Phone, MapPin, Calendar, Clock } from 'lucide-react';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';

const UserProfile = () => {
  const { user , setUser, getUserProfile, BACKEND_URL, token, setToken } = useContext(AppContext)
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [editedProfile, setEditedProfile] = useState(user);

  const formatedDate = (oldDate)=>{
    const date = new Date(oldDate)
    const newDate = String(date.getDate()).padStart(2, '0') + '/' + String(Number(date.getMonth())+1).padStart(2, '0') + '/' + date.getFullYear();
    return newDate
  }

  const logout = ()=>{
    localStorage.removeItem('token');
    setToken(false)
  }

  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value
    });
  };

  useEffect(()=>{
    if(user){
      setEditedProfile(user)
    }
  }, [user])

  const handleSubmit = (e) => {
    setIsLoading(true);
    setTimeout(async () => {
      const formData = new FormData();
      formData.append('email', editedProfile.email);
      formData.append('name', editedProfile.name);
      formData.append('gender', editedProfile.gender);
      formData.append('phoneNo', editedProfile.phoneNo);
      formData.append('location', editedProfile.location);
      formData.append('dob', editedProfile.dob);

      const data = await axios.post(BACKEND_URL+'/update_user', formData, {
        headers: {
          'Content-Type': 'application/json'
      }})
      // console.log(data);
      getUserProfile()
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
    
  };

  const handleCancel = () => {
    setEditedProfile(user);
    setIsEditing(false);
  };

  const renderField = (key, icon, label, type = 'text', editable = true, options = null) => {
    const Icon = icon;
    return (
      <div key={key} className="flex flex-col space-y-2 p-4 bg-white rounded-lg shadow-sm">
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <div className="flex items-center space-x-3">
          <Icon size={20} className="text-green-500 flex-shrink-0" />
          {isEditing && editable ? (
            options ? (
              <select
                name={key}
                value={editedProfile[key]}
                onChange={handleChange}
                required
                className="w-full p-3 bg-green-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-base"
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
                required
                placeholder={`Enter ${label}`}
                className="w-full p-3 bg-green-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-base"
              />
            )
          ) : (
            <span className={`flex-1 text-base ${!editable ? 'text-gray-500' : ''}`}>
              {key==='dob'||key==='registeredOn'?formatedDate(user[key]):user[key]}
            </span>
          )}
        </div>
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
    <div className="min-h-screen bg-green-50 mt-14">
      <div className="sticky top-0 bg-white shadow-sm z-10 p-4">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-green-800">Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-full hover:bg-green-600 active:bg-green-700 transition-colors"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        <div className={`space-y-3 ${isEditing ? 'pb-32' : 'pb-6'}`}>
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

      {isEditing && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 mb-14">
          <div className="flex justify-end space-x-4 max-w-lg mx-auto">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 active:bg-green-700 transition-colors"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}
      {token && !isEditing && (
        <div className="bottom-0 left-0 right-0 bg-white shadow-lg p-4">
          <div className="flex justify-end space-x-4 max-w-lg mx-auto">
            <button
              type="button"
              onClick={logout}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;