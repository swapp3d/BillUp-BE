// utils/api.ts

export const API_URL = "http://localhost:8080/api/v1";

export const LOGIN_API_URL = API_URL + "/auth/login";
export const REGISTER_API_URL = API_URL + "/auth/register";
export const LOGOUT_API_URL = API_URL + "/v1/auth/logout";

export async function registerUser(data: any) {
    const response = await fetch(REGISTER_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
}
