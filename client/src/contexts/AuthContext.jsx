import { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {

        const token = localStorage.getItem('token');

        if (!token) {
            setLoading(false);
            return;
        }

        try {

            const response = await authService.profile();

            setUser(response.data);

        } catch {

            localStorage.removeItem('token');
            setUser(null);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (credentials) => {

        const response = await authService.login(credentials);

        localStorage.setItem(
            'token',
            response.data.token
        );

        await loadUser();
    };

    const register = async (data) => {

        const response = await authService.register(data);

        localStorage.setItem(
            'token',
            response.data.token
        );

        await loadUser();
    };

    const logout = () => {

        localStorage.removeItem('token');

        setUser(null);
    };

    const updateProfile = async (data) => {

        const response =
            await authService.updateProfile(data);

        setUser(response.data);

        return response;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                updateProfile,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);