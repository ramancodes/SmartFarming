import { createContext, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = (props)=>{

    const [currentPage, setCurrentPage] = useState('home');
    const [location, setLocation] = useState('Noida');

    const WEATHER_APIKEY = import.meta.env.VITE_WEATHER_API;
    const NEWS_APIKEY = import.meta.env.VITE_NEWS_API;

    const value = {
        WEATHER_APIKEY,
        NEWS_APIKEY,
        currentPage, 
        setCurrentPage,
        location,
        setLocation
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider