import React from "react";
import { User } from 'lucide-react';

const Profile = () => {
  return (
    <div className="p-4 mt-14">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-center mb-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={48} className="text-gray-400" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-center mb-4">John Farmer</h1>
        <div className="space-y-2">
          <p className="text-gray-600">Email: john@smartfarm.com</p>
          <p className="text-gray-600">Farm Size: 500 acres</p>
          <p className="text-gray-600">Location: Midwest Region</p>
          <p className="text-gray-600">Member Since: 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
