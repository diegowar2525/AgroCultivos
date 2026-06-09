import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import AuthLayout from '../components/AuthLayout';

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data } = await authAPI.login(form);
            // DRF Token (puede ser data.access si usas JWT, o data.token si usas Token Auth)
            localStorage.setItem('token', data.token || data.access);
            localStorage.setItem('nombre', data.nombre || form.email.split('@')[0]);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.detail || 'Credenciales incorrectas');
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout subtitle="Sistema inteligente de cultivos">
            <div className="glass-card">
                <h2 className="card-title">Bienvenido de vuelta</h2>
                <p className="card-subtitle">Ingresa a tu cuenta para continuar</p>

                {error && (
                    <div className="error-msg">
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="field-label">Correo electrónico</label>
                        <input
                            type="email" required
                            placeholder="tu@email.com"
                            className="input-field"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="field-label">Contraseña</label>
                        <input
                            type="password" required
                            placeholder="••••••••"
                            className="input-field"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? (
                            <>
                                <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
                                    <path d="M4 12a8 8 0 018-8v8z" fill="currentColor" className="opacity-75" />
                                </svg>
                                Ingresando...
                            </>
                        ) : 'Iniciar sesión'}
                    </button>
                </form>

                <p className="auth-footer">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="auth-link">
                        Regístrate gratis
                    </Link>
                </p>
            </div>
            <p className="system-note">Sistema de recomendación basado en condiciones agroclimáticas</p>
        </AuthLayout>
    );
}