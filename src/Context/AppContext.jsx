import { createContext, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = (props)=>{

    const [currentPage, setCurrentPage] = useState('home');
    const [location, setLocation] = useState('Noida');

    const value = {
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