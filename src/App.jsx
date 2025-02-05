import React, { useContext } from 'react';
import HomeScreen from "./Components/Home";
import Services from "./Components/Services";
import About from "./Components/About";
import Profile from "./Components/Profile";
import NavBar from "./Components/Navbar";
import TopBar from './Components/TopBar';
import { AppContext } from './Context/AppContext'

const PageContent = ({ currentPage }) => {
  const pages = {
    home: <HomeScreen />,
    services: <Services />,
    about: <About />,
    profile: <Profile />
  };
  
  return pages[currentPage] || <HomePage />;
};

function App() {
  const {currentPage, setCurrentPage} = useContext(AppContext);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <TopBar />
      <div className="pb-16">
        <PageContent currentPage={currentPage} />
      </div>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;

