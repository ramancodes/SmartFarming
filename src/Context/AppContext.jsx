import { createContext, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = (props)=>{

    const [currentPage, setCurrentPage] = useState('home');
    const [location, setLocation] = useState('Noida');
    const [selectedService, setSelectedService] = useState(null);
    const [activeComponent, setActiveComponent] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [condition, setCondition] = useState(null);
    const [wind_kph, setWind_kph] = useState(null);
    const [pressure_mb, setPressure_mb] = useState(null);
    const [region, setRegion] = useState(null);
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);
    const [forcastedWeather, setForcastedWeather] = useState([]);

    const WEATHER_APIKEY = import.meta.env.VITE_WEATHER_API;
    const NEWS_APIKEY = import.meta.env.VITE_NEWS_API;

    const fetchWeatherData = async () => {
        if (!location) return;
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_APIKEY}&q=${location.replace(" ", "+")}&days=8`;
        
        try {
          const response = await fetch(url);
          const data = await response.json(); 
          
          setTemperature(data.current.temp_c);
          setHumidity(data.current.humidity);
          setWind_kph(data.current.wind_kph);
          setPressure_mb(data.current.pressure_mb);
          setRegion(data.location.region);
          setCountry(data.location.country);
          setCondition(data.current.condition.text)
          setForcastedWeather(data.forecast.forecastday.slice(1));
          setError(null);
          
        } catch (err) {
          setError('Error fetching data');
          setTemperature(null);
        } finally {
          if(error){
            console.log(error);
          }
        }
      };

    const handleBack = () => {
        setActiveComponent(null);
        setSelectedService(null);
      };

    const value = {
        WEATHER_APIKEY,
        NEWS_APIKEY,
        currentPage, 
        setCurrentPage,
        location,
        setLocation,
        handleBack,
        selectedService,
        setSelectedService,
        activeComponent,
        setActiveComponent,
        temperature, setTemperature,
        humidity, setHumidity,
        wind_kph, setWind_kph,
        pressure_mb, setPressure_mb,
        region, setRegion,
        country, setCountry,
        condition, setCondition,
        forcastedWeather, setForcastedWeather,
        error, setError,
        fetchWeatherData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider