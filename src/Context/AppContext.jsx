import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props)=>{

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [user, setUser] = useState({})
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

    const formatedDate = (oldDate)=>{
      const date = new Date(oldDate)
      const newDate = date.getFullYear() + '-' + String(Number(date.getMonth())+1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
      return newDate
    }

    const WEATHER_APIKEY = import.meta.env.VITE_WEATHER_API;
    const NEWS_APIKEY = import.meta.env.VITE_NEWS_API;
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

    const getUserProfile = async () =>{
      if(token){
        try {
          const params = {
            token
          }
          const response = await axios.post(`${BACKEND_URL}/get_user`, params, {headers: { 'Content-Type': 'application/json' }});
          if(response.data.success){
            const data = response.data.user;
            // console.log(data);
            setUser({
              email: data[0],
              name: data[1],
              gender: data[2]?data[2]:'',
              phoneNo: data[3]?data[3]:'',
              location: data[4]?data[4]:'',
              dob: data[5] ? formatedDate(data[5]):'',
              registeredOn: formatedDate(data[6])
            }) 
          }else {
            console.log(response.data.message);
            }
        } catch (err) {
          console.log(err);
          toast.error(response.data.message)
        }
      }
    }

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
        fetchWeatherData,
        BACKEND_URL,
        token, setToken,
        user, setUser,
        getUserProfile
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider