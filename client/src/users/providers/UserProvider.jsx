import React, { useContext, useEffect } from 'react'
import { createContext, useState } from "react";
import { getToken, getUser, setTokenInLocalStorage, removeToken } from '../services/localStorageService';
import { getUserById } from '../services/usersApiService';

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [token, setTokenState] = useState(() => getToken());
    const [user, setUser] = useState(() => getUser());
    const [fullUser, setFullUser] = useState(null);

    const fetchFullUser = async () => {
        if (user?._id) {
            try {
                const response = await getUserById(user._id);
                setFullUser(response.data);
            } catch (error) {
                console.error('Failed to fetch full user:', error);
            }
        }
    };

    useEffect(() => {
        fetchFullUser();
    }, [user?._id]);

    const setToken = (newToken) => {
        if (newToken) {
            setTokenInLocalStorage(newToken);
            setTokenState(newToken);
            setUser(getUser());
        } else {
            removeToken();
            setTokenState(null);
            setUser(null);
            setFullUser(null);
        }
    };

    return (
        <UserContext.Provider value={{
            user: fullUser || user,
            setUser,
            token,
            setToken,
            refetchUser: fetchFullUser 
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useCurrentUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useCurrentUser must be used within a Provider');
    return context;
};

