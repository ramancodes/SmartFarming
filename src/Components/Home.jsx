import React, { useContext, useEffect, useState } from "react";
import { homeBackground } from "../Assests/assets.js";
import { AppContext } from "../Context/AppContext.jsx";
import { 
  Cloud, Droplets, Wind, Gauge, Search, 
  ChevronDown, ChevronUp, 
  AlertCircle, MapPin, Newspaper 
} from "lucide-react";

// Reusable Components
const Card = ({ children, className = "", onClick = null }) => (
  <div 
    className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const NewsCard = ({ title, description, link, image }) => (
  <Card className="flex flex-col transition-all duration-300 hover:scale-[1.02] group">
    {image && (
      <div className="h-40 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
        />
      </div>
    )}
    <div className="p-4 flex-grow flex flex-col">
      <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-green-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 flex-grow">
        {description}
      </p>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-green-600 hover:text-green-800 font-medium inline-flex items-center"
      >
        Read More
        <ChevronDown className="ml-2 w-4 h-4" />
      </a>
    </div>
  </Card>
);

const HomeScreen = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
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
  const [inputValue, setInputValue] = useState(location);

  const truncateString = (str, maxLength = 150) => {
    if (!str) return "";
    return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
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
    fetchNewsData();
  }, []);

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  const handleSearch = () => {
    setLocation(inputValue);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen pb-10">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/70 to-blue-600/70 z-10"></div>
        <img 
          src={homeBackground} 
          alt="Agricultural Landscape" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 transform scale-110"
        />
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center text-white text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Smart Farming Intelligence
          </h1>
          <p className="text-md md:text-xl max-w-xl mx-auto mb-6 opacity-90">
            Empowering farmers with real-time insights, predictive analytics, and actionable data
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 -mt-16 relative z-30 space-y-6">
        {/* Location & Search Card */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="text-sm text-gray-500">Current Location</h3>
                <p className="font-bold text-green-700">
                  {location}, {region}, {country}
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-auto flex space-x-2">
              <input
                type="text"
                placeholder="Search location..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
              />
              <button 
                onClick={handleSearch}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>

        {/* Weather Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-white/80 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm text-gray-500">Temperature</h4>
                <p className="text-2xl font-bold text-orange-500">
                  {temperature}°C
                </p>
              </div>
              <Cloud className="w-8 h-8 text-orange-500" />
            </div>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm text-gray-500">Humidity</h4>
                <p className="text-2xl font-bold text-blue-500">
                  {humidity}%
                </p>
              </div>
              <Droplets className="w-8 h-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm text-gray-500">Wind Speed</h4>
                <p className="text-2xl font-bold text-teal-500">
                  {wind_kph} km/h
                </p>
              </div>
              <Wind className="w-8 h-8 text-teal-500" />
            </div>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm text-gray-500">Pressure</h4>
                <p className="text-2xl font-bold text-purple-500">
                  {pressure_mb} mb
                </p>
              </div>
              <Gauge className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* News Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <Newspaper className="mr-3 w-6 h-6 text-green-600" />
              Latest Agriculture News
            </h2>
            <button
              onClick={() => setSeeMore(!seeMore)}
              className="text-green-600 hover:text-green-800 flex items-center"
            >
              {seeMore ? "Show Less" : "Show More"}
              {seeMore ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
            </button>
          </div>

          {errorNews ? (
            <div className="flex items-center bg-red-100 p-4 rounded-lg">
              <AlertCircle className="mr-3 w-6 h-6 text-red-600" />
              <p className="text-red-800">{errorNews}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(seeMore ? newsList : newsList.slice(0, 3)).map((news, index) => (
                <NewsCard
                  key={index}
                  title={news.title}
                  description={truncateString(news.description)}
                  link={news.link}
                  image={news.image_url || homeBackground}
                />
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default HomeScreen;