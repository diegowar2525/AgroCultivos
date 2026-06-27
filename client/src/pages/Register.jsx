import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';

export default function Register() {
    const navigate = useNavigate();

    const { register } = useAuth();

    const [form, setForm] = useState({
        cedula: '',
        first_name: '',
        last_name: '',
        email: '',
        genero: '',
        fecha_nacimiento: '',
        profesion: '',
        password: '',
        confirmar_password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setError('');

        if (form.password !== form.confirmar_password) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);

        try {
            await register(form);

            navigate('/');
        } catch (err) {
            console.error(err);

            const data = err.response?.data;

            if (typeof data === 'object') {
                const firstError = Object.values(data)[0];

                if (Array.isArray(firstError)) {
                    setError(firstError[0]);
                } else {
                    setError(String(firstError));
                }
            } else {
                setError('Error al registrar usuario');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout subtitle="Crea tu cuenta y empieza a sembrar">

            <div className="glass-card">

                <h2 className="card-title">
                    Crear cuenta
                </h2>

                <p className="card-subtitle">
                    Completa tus datos para registrarte
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
                            Cédula
                        </label>

                        <input
                            type="text"
                            required
                            className="input-field"
                            value={form.cedula}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    cedula: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label className="field-label">
                            Nombres
                        </label>

                        <input
                            type="text"
                            required
                            className="input-field"
                            value={form.first_name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    first_name: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label className="field-label">
                            Apellidos
                        </label>

                        <input
                            type="text"
                            required
                            className="input-field"
                            value={form.last_name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    last_name: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label className="field-label">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            required
                            className="input-field"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label className="field-label">
                            Género
                        </label>

                        <select
                            required
                            className="input-field"
                            value={form.genero}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    genero: e.target.value,
                                })
                            }
                        >
                            <option value="">
                                Seleccione una opción
                            </option>

                            <option value="M">
                                Masculino
                            </option>

                            <option value="F">
                                Femenino
                            </option>

                            <option value="O">
                                Otro
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="field-label">
                            Fecha de nacimiento
                        </label>

                        <input
                            type="date"
                            required
                            className="input-field"
                            value={form.fecha_nacimiento}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    fecha_nacimiento: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label className="field-label">
                            Profesión
                        </label>

                        <input
                            type="text"
                            required
                            className="input-field"
                            value={form.profesion}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    profesion: e.target.value,
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
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label className="field-label">
                            Confirmar contraseña
                        </label>

                        <input
                            type="password"
                            required
                            className="input-field"
                            value={form.confirmar_password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    confirmar_password: e.target.value,
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
                                    />

                                    <path
                                        d="M4 12a8 8 0 018-8v8z"
                                        fill="currentColor"
                                    />
                                </svg>

                                Registrando...
                            </>
                        ) : (
                            'Crear cuenta'
                        )}
                    </button>

                </form>

                <p className="auth-footer">
                    ¿Ya tienes una cuenta?{' '}
                    <Link
                        to="/login"
                        className="auth-link"
                    >
                        Inicia sesión
                    </Link>
                </p>

            </div>

        </AuthLayout>
    );
}