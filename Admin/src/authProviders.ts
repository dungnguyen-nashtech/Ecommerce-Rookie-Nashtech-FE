import {AuthProvider} from "@refinedev/core";
import commonAxiosInstance from "./axios/axiosInstance";
import {jwtDecode, JwtPayload} from "jwt-decode";

export const TOKEN_KEY = "refine-auth";
export const TOKEN_ROLE = "TOKEN_ROLE";

interface CustomJwtPayload extends JwtPayload {
    authorities: string[];
}

export const authProviders: AuthProvider = {
    login: async ({email, password}) => {
        if (email && password) {
            try {
                const loginResponse = await commonAxiosInstance.post("/auth/login", {
                    email, // Ensure email is used correctly
                    password,
                });
                const accessToken = loginResponse?.data?.accessToken;
                if (!accessToken) {
                    throw new Error("No access token received");
                }
                const claims = jwtDecode<CustomJwtPayload>(accessToken);
                if (claims?.authorities.includes("ADMIN")) {
                    localStorage.setItem('TOKEN_ROLE', "ADMIN");
                } else if (claims?.authorities.includes("INVENTORY_MANAGER")) {
                    localStorage.setItem('TOKEN_ROLE', "INVENTORY_MANAGER");
                } else {
                    return {
                        success: false,
                        error: {
                            name: "LoginError",
                            message: "Not have permission",
                        },
                    };
                }
                localStorage.setItem(TOKEN_KEY, accessToken);
                return {
                    success: true,
                    redirectTo: "/productItem",
                };
            } catch (error) {
                return {
                    success: false,
                    error: {
                        name: "LoginError",
                        message: "Login failed",
                    },
                };
            }
        } else {
            return {
                success: false,
                error: {
                    name: "InputError",
                    message: "Username/email and password are required",
                },
            };
        }
    },
    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_ROLE);
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return {authenticated: true,};
        }
        return {authenticated: false, redirectTo: "/login"};
    },
    getPermissions: async () => {
        const role = localStorage.getItem(TOKEN_ROLE);
        return role ? {role} : {role: "USER"};
    },
    getIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return {
                id: 1,
                name: "ADMIN",
                avatar: "https://i.pravatar.cc/300",
            };
        }
        return null;
    },
    onError: async (error) => {
        return {error}
    },
};
