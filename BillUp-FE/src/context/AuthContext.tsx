"use client";

import { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface AuthContextType {
    accessToken: string | null;
    isLoggedIn: boolean;
    userID: string | null;
    setAccessToken: (token: string | null) => void;
    setAuthData: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserID] = useState<string | null>(null);

    const setAuthData = (token: string) => {
        setAccessToken(token);
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                isLoggedIn,
                userID,
                setAccessToken,
                setAuthData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
