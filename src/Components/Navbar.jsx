import React from "react";
import { Home, Wrench, Info, User } from 'lucide-react';

const NavBar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'services', icon: Wrench, label: 'Services' },
    { id: 'about', icon: Info, label: 'About' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button 
            key={id}
            onClick={() => setCurrentPage(id)}
            className={`flex flex-col items-center justify-center w-full ${
              currentPage === id ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};


export default NavBar;