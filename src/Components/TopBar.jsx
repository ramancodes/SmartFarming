import React from "react";
import { Bell } from 'lucide-react';


const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-green-600 text-white h-14 flex items-center justify-between px-4 z-50">
      <div className="flex items-center space-x-3">
        {/* <Menu size={24} /> */}
        <img src="/favicon.svg" className="w-5"/>
        <span className="font-semibold text-lg">Smart Farming</span>
      </div>
      {/* <div className="relative">
        <Bell size={24} />
        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
      </div> */}
    </div>
  );
};

export default TopBar;