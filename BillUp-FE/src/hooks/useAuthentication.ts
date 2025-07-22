import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
    LoginFormInputs,
    LoginSuccessResponseType,
} from "@/app/login/types";
import { ErrorResponse } from "@/types/types";
import { RegistrationForm } from "@/app/registration/types";
import {
    LOGIN_API_URL,
    LOGOUT_API_URL,
    REGISTER_API_URL,
} from "@/utils/apiConstants";
import { AuthContextType } from "@/context/types";

export const useAuthentication = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthentication must be used within AuthProvider");
    }

    const { accessToken, isLoggedIn, setAccessToken, setAuthData, userID } = context;

    const login = async (data: LoginFormInputs): Promise<boolean> => {
        const response: Response = await fetch(LOGIN_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorResponse: ErrorResponse = await response.json();
            throw new Error(JSON.stringify(errorResponse));
        }

        const loginResponse: LoginSuccessResponseType = await response.json();

        setAuthData(loginResponse.access_token);

        return true;
    };

    const logout = async (): Promise<boolean> => {
        try {
            const response: Response = await fetch(LOGOUT_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Logout failed with status ${response.status}`);
            }

            setAccessToken(null);

            return true;
        } catch (error) {
            console.error("Error during logout:", error);
            return false;
        }
    };

    const registerUser = async (data: RegistrationForm): Promise<boolean> => {
        const response = await fetch(REGISTER_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorResponse: ErrorResponse = await response.json();
            throw new Error(`Registration failed. ${errorResponse.detail}`);
        }

        return true;
    };



    return {
        login,
        logout,
        registerUser,
        isLoggedIn,
        accessToken,
        userID,
    };
};
