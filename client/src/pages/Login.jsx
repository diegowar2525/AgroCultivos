import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';

export default function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({
        identificador: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setError('');
        setLoading(true);

        try {
            await login(form);

            navigate('/');
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.detail ||
                'Credenciales incorrectas'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout subtitle="Sistema inteligente de cultivos">
            <div className="glass-card">

                <h2 className="card-title">
                    Bienvenido de vuelta
                </h2>

                <p className="card-subtitle">
                    Inicia sesión para continuar
                </p>

                {error && (
                    <div className="error-msg">
                        <span>⚠️</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="field-label">
                            Usuario, correo o cédula
                        </label>

                        <input
                            type="text"
                            required
                            className="input-field"
                            placeholder="Ingresa tu usuario, correo o cédula"
                            value={form.identificador}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    identificador: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label className="field-label">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            required
                            className="input-field"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="spinner"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        strokeWidth="4"
                                        className="opacity-25"
                                    />
                                    <path
                                        d="M4 12a8 8 0 018-8v8z"
                                        fill="currentColor"
                                        className="opacity-75"
                                    />
                                </svg>

                                Ingresando...
                            </>
                        ) : (
                            'Iniciar sesión'
                        )}
                    </button>

                </form>

                <p className="auth-footer">
                    ¿No tienes una cuenta?{' '}
                    <Link
                        to="/register"
                        className="auth-link"
                    >
                        Regístrate aquí
                    </Link>
                </p>

            </div>

            <p className="system-note">
                Sistema de recomendación basado en condiciones agroclimáticas
            </p>
        </AuthLayout>
    );
}