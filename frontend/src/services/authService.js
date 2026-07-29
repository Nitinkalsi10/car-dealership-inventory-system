import api from './api';

export const authService = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.success && response.token) {
            localStorage.setItem('token', response.token);
            if (response.user) {
                localStorage.setItem('user', JSON.stringify(response.user));
            }
        }
        return response;
    },

    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    },

    getToken: () => localStorage.getItem('token'),
};

export default authService;
