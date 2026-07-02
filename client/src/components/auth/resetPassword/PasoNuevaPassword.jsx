import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import authService from '../../../services/authService';

/** Paso 3: el usuario define su nueva contraseña. */
export default function PasoNuevaPassword({ correo, codigo, onExito }) {
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleCambiar() {
        if (pass1.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        if (pass1 !== pass2) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await authService.cambiarPassword({ correo, codigo, nueva_password: pass1 });
            onExito();
        } catch (e) {
            setError(e.response?.data?.error || 'Error al cambiar la contraseña.');
        } finally {
            setLoading(false);
        }
    }

    const campos = [
        { label: 'Nueva contraseña', val: pass1, set: setPass1, show: show1, toggle: () => setShow1((s) => !s) },
        { label: 'Confirmar contraseña', val: pass2, set: setPass2, show: show2, toggle: () => setShow2((s) => !s) },
    ];

    return (
        <div className="reset-step">
            <div className="reset-step-header">
                <div className="reset-step-icon">
                    <Lock size={22} />
                </div>
                <h3>Nueva contraseña</h3>
                <p>Elige una contraseña segura.</p>
            </div>

            {error && <div className="reset-error">⚠ {error}</div>}

            {campos.map(({ label, val, set, show, toggle }) => (
                <div className="form-group" key={label}>
                    <label className="field-label">{label}</label>
                    <div className="input-with-icon">
                        <input
                            type={show ? 'text' : 'password'}
                            className="input-field"
                            value={val}
                            onChange={(e) => set(e.target.value)}
                            placeholder="••••••••"
                        />
                        <button type="button" className="input-icon-btn" onClick={toggle}>
                            {show ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>
            ))}

            <button className="btn-primary" onClick={handleCambiar} disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar nueva contraseña'}
            </button>
        </div>
    );
}
