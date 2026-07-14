import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Lógica del formulario de login: estado de los campos, mostrar/ocultar
 * contraseña, envío y redirección según el rol del usuario.
 */
export function useLogin() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({ identificador: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function updateField(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userData = await login(form);
            navigate(userData?.is_staff ? '/dashboard' : '/my-dashboard');
        } catch (err) {
            const detail = err.response?.data?.detail;
            setError(detail || 'Credenciales incorrectas. Verifica tu usuario y contraseña.');
        } finally {
            setLoading(false);
        }
    }

    return {
        form,
        updateField,
        showPassword,
        setShowPassword,
        error,
        loading,
        handleSubmit,
    };
}