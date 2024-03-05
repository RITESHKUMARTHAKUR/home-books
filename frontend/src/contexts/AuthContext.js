import React,{ createContext, useContext, useEffect, useState } from "react";

const UserContext = React.createContext();

export function useAuth() {
    return useContext(UserContext);
}



export function UserContextProvider({children}) {
    const [currentUser,setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem("currentUser");
        return storedUser ? JSON.parse(storedUser) : null;
      });

    const value = {
        currentUser,
        setCurrentUser  
    };

    useEffect(() => {
        if (currentUser) {
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
          localStorage.removeItem("currentUser");
        }
      }, [currentUser]);
    return (
        <UserContext.Provider value={value} >
            {children}
        </UserContext.Provider>
    )
}