// AuthProvider.jsx
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage"; // Ensure this is correct
import { useNavigate } from "react-router-dom";

// Create the authentication context
const AuthContext = createContext();

// Helper function to get the token from localStorage
const getTokenFromStorage = () => localStorage.getItem("authToken");

// AuthProvider component that provides context to the app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null); // User state from localStorage
    const [authToken, setAuthToken] = useLocalStorage("authToken", null);
    const navigate = useNavigate();


    // Check if the user is logged in and has a valid token
    useEffect(() => {
        const token = getTokenFromStorage();
        if (token) {
            // Optionally: If token is found, you could call an API to get the user info
            // For now, we just set the user data in the context
            // Example:
            // setUser({ id: "userId", name: "User Name", email: "user@example.com" });
        }
    }, [authToken]);


    // Function to log the user in
    const login = (data) => {
        const { token, user } = data;

        localStorage.setItem("authToken", token); // Save token and user to localStorage
        setAuthToken(token); // Update context state with the token
        setUser(JSON.stringify(user)); // Update context state with user data

        navigate("/profile");
    };

    // Function to log the user out
    const logout = () => {
        // Remove token and user from localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");

        setAuthToken(null); // Update context state
        setUser(null); // Update context state

        navigate("/", { replace: true });
    };

    // Memoize the context value to avoid unnecessary re-renders
    const value = useMemo(
        () => ({
            user,
            authToken,
            login,
            logout,
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to access the authentication context
export const useAuth = () => {
    return useContext(AuthContext);
};
