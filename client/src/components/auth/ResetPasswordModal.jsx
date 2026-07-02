import { useState } from 'react';
import PasoCorreo from './resetPassword/PasoCorreo';
import PasoCodigo from './resetPassword/PasoCodigo';
import PasoNuevaPassword from './resetPassword/PasoNuevaPassword';
import PasoExito from './resetPassword/PasoExito';

/**
 * Modal del flujo de "olvidé mi contraseña": correo → código → nueva
 * contraseña → éxito. Cada paso es su propio componente en ./resetPassword/.
 */
export default function ResetPasswordModal({ onCerrar }) {
    const [paso, setPaso] = useState(1); // 1=correo, 2=código, 3=nueva pass, 4=éxito
    const [correo, setCorreo] = useState('');
    const [codigo, setCodigo] = useState('');

    return (
        <div className="reset-modal-overlay">
            <div className="reset-modal">
                {paso < 4 && (
                    <div className="reset-modal-steps">
                        {[1, 2, 3].map((n) => (
                            <div
                                key={n}
                                className={`reset-modal-dot ${paso >= n ? 'reset-modal-dot--active' : ''} ${paso > n ? 'reset-modal-dot--done' : ''}`}
                            />
                        ))}
                    </div>
                )}

                {paso === 1 && (
                    <PasoCorreo
                        onSiguiente={(c) => { setCorreo(c); setPaso(2); }}
                        onVolver={onCerrar}
                    />
                )}
                {paso === 2 && (
                    <PasoCodigo
                        correo={correo}
                        onSiguiente={(c) => { setCodigo(c); setPaso(3); }}
                        onVolver={() => setPaso(1)}
                    />
                )}
                {paso === 3 && (
                    <PasoNuevaPassword
                        correo={correo}
                        codigo={codigo}
                        onExito={() => setPaso(4)}
                    />
                )}
                {paso === 4 && (
                    <PasoExito onLogin={onCerrar} />
                )}
            </div>
        </div>
    );
}
