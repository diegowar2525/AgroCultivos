import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import AuthLayout from '../components/AuthLayout';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmar: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmar) {
            setError('Las contraseñas no coinciden');
            return;
        }
        if (form.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        try {
            const { data } = await authAPI.register({
                nombre: form.nombre,
                email: form.email,
                password: form.password,
            });
            localStorage.setItem('token', data.token || data.access);
            localStorage.setItem('nombre', data.nombre || form.nombre);
            navigate('/');
        } catch (err) {
            // Manejar validaciones típicas de DRF (ej: correo ya existe)
            const errorDetail = err.response?.data?.email?.[0] || err.response?.data?.detail || 'Error al crear la cuenta';
            setError(errorDetail);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout subtitle="Crea tu cuenta y empieza a sembrar">
            <div className="glass-card">
                <h2 className="card-title">Crear cuenta</h2>
                <p className="card-subtitle">Es gratis y solo toma un momento</p>

                {error && (
                    <div className="error-msg">
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="field-label">Nombre completo</label>
                        <input type="text" required placeholder="Juan Pérez" className="input-field"
                            value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label className="field-label">Correo electrónico</label>
                        <input type="email" required placeholder="tu@email.com" className="input-field"
                            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label className="field-label">Contraseña</label>
                        <input type="password" required placeholder="Mínimo 6 caracteres" className="input-field"
                            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label className="field-label">Confirmar contraseña</label>
                        <input type="password" required placeholder="Repite tu contraseña" className="input-field"
                            value={form.confirmar} onChange={e => setForm({ ...form, confirmar: e.target.value })} />
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? (
                            <>
                                <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
                                    <path d="M4 12a8 8 0 018-8v8z" fill="currentColor" className="opacity-75" />
                                </svg>
                                Creando cuenta...
                            </>
                        ) : 'Crear mi cuenta'}
                    </button>
                </form>

                <p className="auth-footer">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="auth-link">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}