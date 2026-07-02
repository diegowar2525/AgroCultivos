import { useState } from 'react';
import { ArrowLeft, KeyRound } from 'lucide-react';
import authService from '../../../services/authService';

/** Paso 2: el usuario ingresa el código de 6 dígitos recibido por correo. */
export default function PasoCodigo({ correo, onSiguiente, onVolver }) {
    const [codigo, setCodigo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [reenviando, setReenviando] = useState(false);

    async function handleVerificar() {
        if (codigo.length !== 6) {
            setError('El código debe tener 6 dígitos.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await authService.verificarCodigo(correo, codigo);
            onSiguiente(codigo);
        } catch (e) {
            setError(e.response?.data?.error || 'Código incorrecto o expirado.');
        } finally {
            setLoading(false);
        }
    }

    async function handleReenviar() {
        setReenviando(true);
        try {
            await authService.solicitarCodigo(correo);
        } catch {
            // El envío silencioso ya se maneja en el backend; no bloqueamos la UI.
        }
        setTimeout(() => setReenviando(false), 30000);
    }

    return (
        <div className="reset-step">
            <div className="reset-step-header">
                <div className="reset-step-icon">
                    <KeyRound size={22} />
                </div>
                <h3>Ingresa el código</h3>
                <p>
                    Enviamos un código de 6 dígitos a<br />
                    <strong className="reset-highlight">{correo}</strong>
                </p>
            </div>

            {error && <div className="reset-error">⚠ {error}</div>}

            <div className="form-group">
                <label className="field-label">Código de verificación</label>
                <input
                    type="text"
                    maxLength={6}
                    className="input-field reset-code-input"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => e.key === 'Enter' && handleVerificar()}
                    placeholder="000000"
                />
                <p className="reset-code-hint">⏱ El código expira en 15 minutos</p>
            </div>

            <button className="btn-primary" onClick={handleVerificar} disabled={loading}>
                {loading ? 'Verificando...' : 'Verificar código'}
            </button>

            <div className="reset-step-footer">
                <button className="reset-link-btn" onClick={onVolver}>
                    <ArrowLeft size={13} /> Cambiar correo
                </button>
                <button className="reset-link-btn reset-link-btn--accent" onClick={handleReenviar} disabled={reenviando}>
                    {reenviando ? 'Código reenviado ✓' : 'Reenviar código'}
                </button>
            </div>
        </div>
    );
}