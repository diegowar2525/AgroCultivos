import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/layout/AuthLayout';
import ResetPasswordModal from '../components/auth/ResetPasswordModal';
import { useLogin } from '../hooks/useLogin';

export default function Login() {
    const {
        form,
        updateField,
        showPassword,
        setShowPassword,
        error,
        loading,
        handleSubmit,
    } = useLogin();

    const [modalAbierto, setModalAbierto] = useState(false);

    return (
        <>
            {modalAbierto && <ResetPasswordModal onCerrar={() => setModalAbierto(false)} />}

            <AuthLayout title="Bienvenido" subtitle="Inicia sesión en SIGRA">
                <div className="auth-card">
                    {error && (
                        <div className="error-msg">
                            <span>⚠️</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="field-label">Cédula, usuario o correo</label>
                            <input
                                type="text"
                                required
                                className="input-field"
                                placeholder="0912345675, jespinoza o tu@correo.com"
                                value={form.identificador}
                                onChange={(e) => updateField('identificador', e.target.value)}
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <div className="field-label-row">
                                <label className="field-label">Contraseña</label>
                                <button
                                    type="button"
                                    className="forgot-password-link"
                                    onClick={() => setModalAbierto(true)}
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>
                            <div className="input-with-icon">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="input-field"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={(e) => updateField('password', e.target.value)}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="input-icon-btn"
                                    onClick={() => setShowPassword((s) => !s)}
                                >
                                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary">
                            {loading ? 'Ingresando...' : 'Iniciar sesión'}
                        </button>
                    </form>

                    <p className="auth-footer">
                        ¿No tienes una cuenta?{' '}
                        <Link to="/register" className="auth-link">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>

                <p className="system-note">
                    Puedes ingresar con tu <strong>cédula</strong>, <strong>nombre de usuario</strong> o{' '}
                    <strong>correo electrónico</strong>.
                </p>
            </AuthLayout>
        </>
    );
}
