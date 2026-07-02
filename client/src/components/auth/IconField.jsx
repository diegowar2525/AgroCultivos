/**
 * Input con ícono a la izquierda, usado en varios campos del registro
 * (cédula, nombres, apellidos, correo). Evita repetir el mismo bloque
 * de marcado 4 veces dentro de Register.jsx.
 *
 * `status` controla el color del borde: 'default' | 'success' | 'error'.
 * `trailing` es un botón opcional a la derecha (ej. mostrar/ocultar contraseña).
 */
export default function IconField({
    label,
    icon: Icon,
    status = 'default',
    trailing,
    className = '',
    ...inputProps
}) {
    return (
        <div className={`form-group ${className}`}>
            {label && <label className="field-label">{label}</label>}
            <div className="icon-field">
                {Icon && <Icon size={14} className="icon-field-icon" />}
                <input
                    className={`input-field icon-field-input status-${status} ${trailing ? 'icon-field-input--trailing' : ''}`}
                    {...inputProps}
                />
                {trailing}
            </div>
        </div>
    );
}