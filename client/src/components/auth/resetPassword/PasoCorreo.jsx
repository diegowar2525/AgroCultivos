import { useState } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import authService from '../../../services/authService';

/** Paso 1: el usuario ingresa su correo para recibir el código. */
export default function PasoCorreo({ onSiguiente, onVolver }) {
    const [correo, setCorreo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleEnviar() {
        if (!correo.includes('@')) {
            setError('Ingresa un correo válido.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await authService.solicitarCodigo(correo);
            onSiguiente(correo);
        } catch (e) {
            setError(e.response?.data?.error || 'Error al enviar el código.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="reset-step">
            <div className="reset-step-header">
                <div className="reset-step-icon">
                    <Mail size={22} />
                </div>
                <h3>Restablecer contraseña</h3>
                <p>Ingresa tu correo registrado y te enviaremos un código de 6 dígitos.</p>
            </div>

            {error && <div className="reset-error">⚠ {error}</div>}

            <div className="form-group">
                <label className="field-label">Correo electrónico</label>
                <input
                    type="email"
                    className="input-field"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEnviar()}
                    placeholder="tu@correo.com"
                />
            </div>

            <button className="btn-primary" onClick={handleEnviar} disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar código'}
            </button>

            <button className="reset-link-btn" onClick={onVolver}>
                <ArrowLeft size={13} /> Volver al login
            </button>
        </div>
    );
}
