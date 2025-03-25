import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft, Search, MapPin, Wind, Droplet, Gauge, Cloud, Sun, Cloud as CloudIcon, CloudRain } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AppContext } from "../Context/AppContext";

const WeatherComponent = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    location,
    setLocation,
    forcastedWeather,
    temperature,
    humidity,
    wind_kph,
    pressure_mb,
    condition,
    region,
    country,
    error,
    fetchWeatherData,
  } = useContext(AppContext);

  const [inputValue, setInputValue] = useState(location);

  function getDayOfWeek(dateStr) {
    const date = new Date(dateStr);
    const daysOfWeek = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    return daysOfWeek[date.getDay()];
  }

  function getWeatherIcon(conditionText) {
    const lowerCondition = conditionText.toLowerCase();
    if (lowerCondition.includes('sunny')) return <Sun className="text-yellow-500" />;
    if (lowerCondition.includes('cloudy')) return <CloudIcon className="text-gray-500" />;
    if (lowerCondition.includes('rain')) return <CloudRain className="text-blue-500" />;
    return <Cloud className="text-gray-400" />;
  }

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  const handleSearch = () => {
    setLocation(inputValue);
  };

  // useEffect(() => {
  //   const debounceTimer = setTimeout(() => {
  //     setLocation(inputValue);
  //   }, 1000);

  //   return () => {
  //     clearTimeout(debounceTimer);
  //   };
  // }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const chartData = !error ? forcastedWeather.map((day, index) => ({
    name: index === 0 ? 'Today' : getDayOfWeek(day.date),
    temperature: day.day.avgtemp_c,
    maxTemp: day.day.maxtemp_c,
    minTemp: day.day.mintemp_c
  })) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 mt-14">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack} 
            className="mr-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
          >
            <ArrowLeft size={24} className="text-blue-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Weather Forecast</h2>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg mb-6 p-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              className="flex-grow p-3 border-2 border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter location"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button 
              onClick={handleSearch}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Current Weather */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-20">
            {getWeatherIcon(condition)}
          </div>
          
          <div className="flex items-center mb-4">
            <MapPin className="mr-3 text-blue-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{location}</h3>
              <p className="text-gray-500">{region}, {country}</p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg text-gray-600 mb-2">Today</h3>
            <p className="text-5xl font-bold text-blue-600 mb-2">
              {!error ? `${temperature}°C` : '0°C'}
            </p>
            <p className="text-gray-500">{!error ? condition : 'Not Available'}</p>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <WeatherDetailCard 
              icon={<Droplet className="text-blue-500" />} 
              label="Humidity" 
              value={!error ? `${humidity}%` : '0%'} 
            />
            <WeatherDetailCard 
              icon={<Wind className="text-green-500" />} 
              label="Wind" 
              value={!error ? `${wind_kph} km/h` : '0 km/h'} 
            />
            <WeatherDetailCard 
              icon={<Gauge className="text-purple-500" />} 
              label="Pressure" 
              value={!error ? `${pressure_mb} mb` : '0 mb'} 
            />
          </div>
        </div>

        {!error && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
              Temperature Forecast
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}
                  labelStyle={{ fontWeight: 'bold', color: '#333' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  name="Average Temperature"
                />
                <Line 
                  type="monotone" 
                  dataKey="maxTemp" 
                  stroke="#82ca9d" 
                  name="Maximum Temperature"
                />
                <Line 
                  type="monotone" 
                  dataKey="minTemp" 
                  stroke="#ff7300" 
                  name="Minimum Temperature"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* 7-Day Forecast */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
            7-Day Forecast
          </h2>
          
          {error && <p className="text-center text-gray-500">Forecast Not Available</p>}
          
          {!error && forcastedWeather.map((day, index) => (
            <div 
              key={day.date} 
              className={`flex items-center justify-between p-4 rounded-lg mb-3 ${
                index === 0 ? 'bg-blue-50' : 'bg-gray-50'
              } hover:scale-[1.02] transition-transform`}
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {index === 0 ? 'Tomorrow' : getDayOfWeek(day.date)}
                </p>
                <div className="text-sm text-gray-500">
                  {getWeatherIcon(day.day.condition.text)}
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">
                  {day.day.avgtemp_c}°C
                </p>
                <p className="text-sm text-gray-500">
                  {day.day.condition.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable Weather Detail Card Component
const WeatherDetailCard = ({ icon, label, value }) => (
  <div className="bg-gray-50 p-3 rounded-lg text-center">
    <div className="flex justify-center mb-2">{icon}</div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

export default WeatherComponent;