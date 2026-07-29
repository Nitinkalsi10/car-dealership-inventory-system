import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => authService.getCurrentUser());
    const [token, setToken] = useState(() => authService.getToken());
    const [loading, setLoading] = useState(false);

    // Sync token state on mount & handle 401 unauthorized events
    useEffect(() => {
        const handleAuthExpired = () => {
            setUser(null);
            setToken(null);
        };

        window.addEventListener('auth:expired', handleAuthExpired);
        return () => window.removeEventListener('auth:expired', handleAuthExpired);
    }, []);

    const login = async (credentials) => {
        setLoading(true);
        try {
            const res = await authService.login(credentials);
            if (res.success && res.user && res.token) {
                setUser(res.user);
                setToken(res.token);
            }
            return res;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            const res = await authService.register(userData);
            return res;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setToken(null);
    };

    const isAuthenticated = !!token && !!user;
    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                isAdmin,
                loading,
                login,
                register,
                logout,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
