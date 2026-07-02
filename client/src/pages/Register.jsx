import { Link } from 'react-router-dom';
import { CreditCard, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/layout/AuthLayout';
import IconField from '../components/auth/IconField';
import { useRegister } from '../hooks/useRegister';

export default function Register() {
    const {
        form,
        updateField,
        handleCedulaChange,
        cedulaEstado,
        isAgronomo,
        setIsAgronomo,
        showPassword,
        setShowPassword,
        showConfirm,
        setShowConfirm,
        error,
        loading,
        handleSubmit,
    } = useRegister();

    const confirmMismatch = form.confirmar_password && form.password !== form.confirmar_password;

    return (
        <AuthLayout title="Crear Cuenta" subtitle="Únete a SIGRA" maxWidth="420px">
            <div className="auth-card">
                {error && (
                    <div className="error-msg error-msg--multiline">
                        {error.split('\n').map((linea, i) => (
                            <div key={i}>⚠ {linea}</div>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="register-form">
                    <IconField
                        label="Cédula de identidad"
                        icon={CreditCard}
                        type="text"
                        inputMode="numeric"
                        maxLength={10}
                        required
                        placeholder="Ej: 0912345675"
                        value={form.cedula}
                        onChange={handleCedulaChange}
                        status={cedulaEstado === null ? 'default' : cedulaEstado.valida ? 'success' : 'error'}
                    />
                    {cedulaEstado && (
                        <div className={cedulaEstado.valida ? 'cedula-feedback cedula-feedback--ok' : 'cedula-feedback cedula-feedback--error'}>
                            {cedulaEstado.valida ? '✓ Cédula válida' : cedulaEstado.mensaje}
                        </div>
                    )}

                    <div className="form-grid-2">
                        <IconField
                            label="Nombres"
                            icon={User}
                            type="text"
                            required
                            placeholder="Daniel"
                            value={form.first_name}
                            onChange={(e) => updateField('first_name', e.target.value)}
                        />
                        <IconField
                            label="Apellidos"
                            icon={User}
                            type="text"
                            required
                            placeholder="Espinoza"
                            value={form.last_name}
                            onChange={(e) => updateField('last_name', e.target.value)}
                        />
                    </div>

                    <IconField
                        label="Correo electrónico"
                        icon={Mail}
                        type="email"
                        required
                        placeholder="tu@correo.com"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                    />
                    <p className="field-hint">Debe ser una cuenta @gmail.com</p>

                    <div className="form-grid-2">
                        <div className="form-group">
                            <label className="field-label">Género</label>
                            <select
                                required
                                className="input-field"
                                value={form.genero}
                                onChange={(e) => updateField('genero', e.target.value)}
                            >
                                <option value="" disabled>Seleccionar</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="O">Otro</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="field-label">Fecha de nacimiento</label>
                            <input
                                type="date"
                                required
                                className="input-field"
                                value={form.fecha_nacimiento}
                                onChange={(e) => updateField('fecha_nacimiento', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="field-label">¿Eres agrónomo?</label>
                        <div className="choice-group">
                            <button
                                type="button"
                                className={`choice-btn ${isAgronomo === true ? 'choice-btn--active' : ''}`}
                                onClick={() => setIsAgronomo(true)}
                            >
                                Sí, soy agrónomo
                            </button>
                            <button
                                type="button"
                                className={`choice-btn ${isAgronomo === false ? 'choice-btn--active' : ''}`}
                                onClick={() => setIsAgronomo(false)}
                            >
                                No, otra profesión
                            </button>
                        </div>
                    </div>

                    {isAgronomo === false && (
                        <div className="form-group">
                            <label className="field-label">¿Cuál es tu profesión?</label>
                            <input
                                type="text"
                                required
                                className="input-field"
                                placeholder="Ej: Biólogo, Ingeniero agrícola..."
                                value={form.profesion}
                                onChange={(e) => updateField('profesion', e.target.value)}
                            />
                        </div>
                    )}

                    <div className="form-grid-2">
                        <IconField
                            label="Contraseña"
                            icon={Lock}
                            type={showPassword ? 'text' : 'password'}
                            required
                            minLength={6}
                            placeholder="Mín. 6 caracteres"
                            value={form.password}
                            onChange={(e) => updateField('password', e.target.value)}
                            trailing={
                                <button type="button" className="icon-field-trailing-btn" onClick={() => setShowPassword((s) => !s)}>
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            }
                        />
                        <IconField
                            label="Confirmar"
                            icon={Lock}
                            type={showConfirm ? 'text' : 'password'}
                            required
                            placeholder="Repite la contraseña"
                            value={form.confirmar_password}
                            onChange={(e) => updateField('confirmar_password', e.target.value)}
                            status={confirmMismatch ? 'error' : 'default'}
                            trailing={
                                <button type="button" className="icon-field-trailing-btn" onClick={() => setShowConfirm((s) => !s)}>
                                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            }
                        />
                    </div>

                    <button type="submit" disabled={loading || (cedulaEstado && !cedulaEstado.valida)} className="btn-primary">
                        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </button>
                </form>

                <p className="auth-footer">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="auth-link">
                        Inicia sesión
                    </Link>
                </p>
            </div>

            <p className="system-note">
                <strong>¿Tu cédula no pasa?</strong> Asegúrate de que sea tu cédula ecuatoriana real de 10 dígitos.
                El sistema valida el dígito verificador oficial del Registro Civil.
            </p>
        </AuthLayout>
    );
}
