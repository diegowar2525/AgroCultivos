import { CheckCircle } from 'lucide-react';

/** Paso 4: confirmación de que la contraseña se actualizó correctamente. */
export default function PasoExito({ onLogin }) {
    return (
        <div className="reset-step reset-step--success">
            <div className="reset-success-icon">
                <CheckCircle size={30} />
            </div>
            <div>
                <h3>¡Contraseña actualizada!</h3>
                <p>
                    Tu contraseña fue cambiada exitosamente.<br />
                    Ya puedes iniciar sesión.
                </p>
            </div>
            <button className="btn-primary reset-success-btn" onClick={onLogin}>
                Ir al login
            </button>
        </div>
    );
}