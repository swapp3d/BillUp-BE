import { ParsedJWTType } from "@/app/login/types";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export const validateToken = (token: string): boolean => {
    try {
        const decoded: ParsedJWTType = jwtDecode<ParsedJWTType>(token);
        if (!decoded || typeof decoded.exp !== "number") return false;

        return dayjs.unix(decoded.exp).isAfter(dayjs());
    } catch (e) {
        console.error("Token validation error:", e);
        return false;
    }
};

export const clearLocalStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("roles");
};

export const matchPath = (path: string, patterns: string[]): boolean => {
    return patterns.some((pattern) => {
        const regex: RegExp = new RegExp(`^${pattern.replace("*", ".*")}$`);
        return regex.test(path);
    });
};
