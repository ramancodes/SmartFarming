import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft, Search, MapPin } from "lucide-react";
import { AppContext } from "../Context/AppContext";

// Weather Component
const WeatherComponent = ({ onBack }) => {
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
    const date = new Date(dateStr); // Convert the date string to a Date object
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[date.getDay()]; // getDay() returns a number (0 = Sunday, 1 = Monday, etc.)
  }

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setLocation(inputValue);
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="p-4  mt-14">
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="mr-2">
          <ArrowLeft size={24} className="text-green-600" />
        </button>
        <h2 className="text-xl font-bold">Weather Forecast</h2>
      </div>

      <div className="p-4 bg-white rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Search Location</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Enter location"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Search
            size={24}
            className="text-green-600"
            onClick={fetchWeatherData}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
        <div className="text-center p-4">
          <div className="flex items-center space-x-4">
            <MapPin />
            <div className="text-start">
              <h3 className="text-2xl font-semibold"> Current Location</h3>
              <p className="text-gray-600">
                {location}, {region}, {country}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center p-4">
          <h3 className="text-2xl font-semibold">Today</h3>
          {!error && (
            <p className="text-4xl font-bold text-blue-600 my-2">
              {temperature}°C
            </p>
          )}
          {error && (
            <p className="text-4xl font-bold text-blue-600 my-2">0°C</p>
          )}
          {!error && <p className="text-gray-600">{condition}</p>}
          {error && <p className="text-gray-600">Not Available</p>}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50 p-2 rounded-lg text-center">
            <p className="font-semibold">Humidity</p>
            {!error && <p className="text-sm">{humidity}%</p>}
            {error && <p className="text-sm">0%</p>}
          </div>
          <div className="bg-gray-50 p-2 rounded-lg text-center">
            <p className="font-semibold">Wind</p>
            {!error && <p className="text-sm">{wind_kph} km/h</p>}
            {error && <p className="text-sm">0 km/h</p>}
          </div>
          <div className="bg-gray-50 p-2 rounded-lg text-center">
            <p className="font-semibold">Pressure</p>
            {!error && <p className="text-sm">{pressure_mb} mb</p>}
            {error && <p className="text-sm">0 mb</p>}
          </div>
        </div>
      </div>

      <div className="flex items-center mb-4 mt-4">
        <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-center text-gray-800">
              7-Day Weather Forecast
            </h1>
          </div>

          <div className="space-y-4">
            {error && <p className="text-gray-600 pl-4">Not Available</p>}
            {!error && forcastedWeather.map((day, index) => (
              <div
                key={day.date}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  index === 0 ? "bg-blue-50" : "bg-gray-50"
                } shadow-sm hover:shadow-md transition-shadow duration-200`}
              >
                
                <div className="flex flex-col">
                    {index===0 
                    ? <span className="font-semibold text-lg text-gray-800">Tomorrow</span>
                    : <span className="font-semibold text-lg text-gray-800">{getDayOfWeek(day.date)}</span>
                    }
                  
                  <span className="text-sm text-gray-600">
                    Humidity: {day.day.avghumidity}%
                  </span>
                  <span className="text-sm text-gray-600">
                    Wind: {day.day.maxwind_kph} mph
                  </span>
                  <div className="text-sm text-gray-600">
                    Precipitation: {day.day.totalprecip_mm} mm
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">
                      {day.day.avgtemp_c}°C
                    </div>
                    {day.day.condition.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
