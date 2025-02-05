import React, { useContext, useEffect, useState } from 'react';
import { homeBackground } from '../Assests/assets.js';
import { AppContext } from '../Context/AppContext.jsx';


const HomeScreen = () => {

  const { location, setLocation } = useContext(AppContext);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind_kph, setWind_kph] = useState(null);
  const [pressure_mb, setPressure_mb] = useState(null);
  const [region, setRegion] = useState(null);
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchWeatherData = async () => {
    if (!location) return;
    const APIKEY = import.meta.env.VITE_WEATHER_API
    const url = `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${location.replace(" ", "+")}`;
    
    try {
      const response = await fetch(url);
      // const response = await axios.get(url);
      const data = await response.json();
      
      setTemperature(data.current.temp_c);
      setHumidity(data.current.humidity);
      setWind_kph(data.current.wind_kph);
      setPressure_mb(data.current.pressure_mb);
      setRegion(data.location.region);
      setCountry(data.location.country);
      setError(null);
      
    } catch (err) {
      setError('Error fetching data');
      setTemperature(null);
    } finally {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchWeatherData()
  }, [location]);

  return (
    <div className="relative h-screen w-full bg-gray-50 mt-14">
      {/* Main content area */}
      <main className="h-full pb-16">
        {/* Hero image section */}
        <div className="relative h-64 md:h-96 w-full">
          <img
            src={homeBackground}
            alt="Agricultural field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30">
            <div className="p-6 absolute bottom-0 text-white">
              <h1 className="text-2xl md:text-4xl font-bold mb-2">
                Smart Farming Solutions
              </h1>
              <p className="text-sm md:text-base">
                Monitor and manage your farm with advanced technology
              </p>
            </div>
          </div>
        </div>

        {/* Quick stats section */}
        <div className="p-4 grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Location</h3>
            {error && <p className="text-xl font-bold text-orange-500">NA</p>}
            {region !== null && country !== null && !error && (
              <p className="text-sm font-bold text-green-600">{location}, {region}, {country}</p>
            )}
          </div>
        </div>

        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Humidity</h3>
            {error && <p className="text-xl font-bold text-orange-500">NA</p>}
            {humidity !== null && !error && (
              <p className="text-2xl font-bold text-green-600">{humidity}<span className='text-sm'>%</span></p>
            )}
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Temperature</h3>
            {error && <p className="text-xl font-bold text-orange-500">NA</p>}
            {temperature !== null && !error && (
              <p className="text-2xl font-bold text-orange-500">{temperature}<span className='text-sm'>°C</span></p>
            )}
          </div>
        </div>

        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Wind</h3>
            {error && <p className="text-xl font-bold text-orange-500">NA</p>}
            {wind_kph !== null && !error && (
              <p className="text-2xl font-bold text-orange-500">{wind_kph} <span className='text-sm'>km/hr</span></p>
            )}
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Pressure</h3>
            {error && <p className="text-xl font-bold text-orange-500">NA</p>}
            {pressure_mb !== null && !error && (
              <p className="text-2xl font-bold text-orange-500">{pressure_mb} <span className='text-sm'>mb</span></p>
            )}
          </div>
        </div>

        {/* Search for weather section */}
        <div className="p-4 bg-white rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Search Location</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              onClick={fetchWeatherData}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Search
            </button>
          </div>
        </div>

        {/* Recent activities section */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">Irrigation completed</p>
              <p className="text-xs text-gray-400">2 hours ago</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">Fertilizer application scheduled</p>
              <p className="text-xs text-gray-400">5 hours ago</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;