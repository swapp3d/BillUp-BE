import { ReactNode } from "react";

export type AuthContextType = {
    isLoggedIn: () => boolean;
    accessToken: string | null;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
    setAuthData: (token: string) => void;
    userID: number | null;
    userRoles: string[] | null;
    validateJwtToken: () => Promise<boolean>;
};

export type AuthProviderProps = {
    children: ReactNode;
};
