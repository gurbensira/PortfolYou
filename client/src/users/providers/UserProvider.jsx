import React, { useContext } from 'react'
import { createContext, useState } from "react";
import { getToken, getUser, setTokenInLocalStorage, removeToken } from '../services/localStorageService';

const UserContext = createContext();

export default function UserProvider({ children }) {

    const [token, setTokenState] = useState(() => getToken());
    const [user, setUser] = useState(() => getUser());

    const setToken = (newToken) => {
        if (newToken) {
            setTokenInLocalStorage(newToken);
            setTokenState(newToken);
            setUser(getUser());
        } else {
            removeToken();
            setTokenState(null);
            setUser(null);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </UserContext.Provider>
    )
}

export const useCurrentUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useCurrentUser must be used within a Provider');
    return context;
}

