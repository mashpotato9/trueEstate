import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
    console.log('AuthProvider rendering');

    const [currUser, setCurrUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const updateUser = (user) => {
        setCurrUser(user);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currUser));
    }, [currUser]);

    return (
        <authContext.Provider value={{currUser, updateUser}}>
        {children}
        </authContext.Provider>
    );
};