import React, { useContext, useEffect, useState } from "react";
import { homeBackground } from "../Assests/assets.js";
import { AppContext } from "../Context/AppContext.jsx";
import { Cloud, Droplets, Wind, Gauge, Search, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const Alert = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
  };

  return (
    <div className={`flex items-center gap-2 p-3 rounded-lg ${variants[variant]}`}>
      {children}
    </div>
  );
};

const WeatherCard = ({ title, value, unit, icon: Icon, color }) => (
  <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>
            {value}<span className="text-sm">{unit}</span>
          </p>
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </div>
  </Card>
);

const NewsCard = ({ title, description, link }) => (
  <Card className="transition-all duration-300 hover:shadow-lg group">
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
        {title}
      </h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm text-blue-500 hover:text-blue-700"
      >
        Read More →
      </a>
    </div>
  </Card>
);

const HomeScreen = () => {
  const {
    location,
    setLocation,
    NEWS_APIKEY,
    temperature,
    humidity,
    wind_kph,
    pressure_mb,
    region,
    country,
    error,
    fetchWeatherData,
  } = useContext(AppContext);

  const [newsList, setNewsList] = useState([]);
  const [errorNews, setErrorNews] = useState(null);
  const [seeMore, setSeeMore] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const truncateString = (str, maxLength = 200) => {
    if (!str || str.length < 10) return "";
    return str.length > maxLength ? `${str.slice(0, maxLength - 3)}...` : str;
  };

  const fetchNewsData = async () => {
    const news_url = `https://newsdata.io/api/1/latest?apikey=${NEWS_APIKEY}&qInTitle=agriculture&language=en`;

    try {
      const response = await fetch(news_url);
      const data = await response.json();
      if (data.status === "success") {
        setNewsList(data.results);
        setErrorNews(null);
      } else {
        setErrorNews("No News Available");
      }
    } catch (err) {
      setErrorNews("Error fetching data");
      setNewsList([]);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  useEffect(() => {
    fetchNewsData();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gray-50 mt-14 mb-16">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={homeBackground}
          alt="Agricultural field"
          className="w-full h-full object-cover transform scale-105 transition-transform duration-10000 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70">
          <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Smart Farming Solutions
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Revolutionizing agriculture with real-time monitoring and advanced analytics
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        {/* Location Card */}
        <Card className="mb-8 bg-white/95 backdrop-blur">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Your Location</h3>
                {error ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>Please search for a location</span>
                  </Alert>
                ) : (
                  <p className="text-lg font-bold text-green-600">
                    {location && region && country ? `${location}, ${region}, ${country}` : "Location not set"}
                  </p>
                )}
              </div>
              <div className="flex-1 max-w-md">
                <div className={`flex items-center p-2 border-2 rounded-lg transition-all duration-300 ${
                  isSearchFocused ? "border-blue-500 shadow-lg" : "border-gray-200"
                }`}>
                  
                  <input
                    type="text"
                    className="flex-1 p-2 outline-none bg-transparent"
                    placeholder="Search location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <button
                    onClick={fetchWeatherData}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Search className="w-4 h-6 text-white-800" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Weather Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <WeatherCard
            title="Humidity"
            value={error ? "0" : humidity}
            unit="%"
            icon={Droplets}
            color="text-blue-500"
          />
          <WeatherCard
            title="Temperature"
            value={error ? "0" : temperature}
            unit="°C"
            icon={Cloud}
            color="text-orange-500"
          />
          <WeatherCard
            title="Wind Speed"
            value={error ? "0" : wind_kph}
            unit="km/h"
            icon={Wind}
            color="text-teal-500"
          />
          <WeatherCard
            title="Pressure"
            value={error ? "0" : pressure_mb}
            unit="mb"
            icon={Gauge}
            color="text-purple-500"
          />
        </div>

        {/* News Section */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Latest Agriculture News</h2>
            <div className="space-y-4">
              {errorNews ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <span>{errorNews}</span>
                </Alert>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(seeMore ? newsList : newsList.slice(0, 4)).map((news, index) => (
                      <NewsCard
                        key={index}
                        title={news.title}
                        description={truncateString(news.description)}
                        link={news.link}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setSeeMore(!seeMore)}
                    className="w-full mt-4 p-3 text-blue-500 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {seeMore ? (
                      <>Show Less <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Show More <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Activities</h2>
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">No recent activities to display</p>
              <p className="text-sm mt-2">Your farming activities will appear here</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomeScreen;