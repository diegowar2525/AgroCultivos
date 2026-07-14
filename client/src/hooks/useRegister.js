import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validarCedulaEC } from '../utils/cedulaEcuador';

const FORM_INICIAL = {
    cedula: '',
    first_name: '',
    last_name: '',
    email: '',
    genero: '',
    fecha_nacimiento: '',
    profesion: '',
    password: '',
    confirmar_password: '',
};

/**
 * Lógica del formulario de registro: estado de los campos, validación
 * de cédula en tiempo real, elección de "¿eres agrónomo?", mostrar/ocultar
 * contraseñas y envío al backend.
 */
export function useRegister() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [form, setForm] = useState(FORM_INICIAL);
    const [isAgronomo, setIsAgronomo] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [cedulaEstado, setCedulaEstado] = useState(null); // {valida, mensaje} | null
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function updateField(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    function handleCedulaChange(e) {
        const valor = e.target.value.replace(/\D/g, '').slice(0, 10);
        updateField('cedula', valor);

        if (valor.length === 0) {
            setCedulaEstado(null);
            return;
        }
        if (valor.length < 10) {
            setCedulaEstado({ valida: false, mensaje: `Faltan ${10 - valor.length} dígitos` });
            return;
        }
        setCedulaEstado(validarCedulaEC(valor));
    }

    function parseServerError(err) {
        const data = err.response?.data;
        if (typeof data !== 'object' || data === null) {
            return 'Error al crear la cuenta. Intenta de nuevo.';
        }
        const etiquetas = { cedula: 'Cédula', email: 'Correo' };
        return Object.entries(data)
            .map(([campo, mensaje]) => {
                const nombre = etiquetas[campo] || campo;
                const texto = Array.isArray(mensaje) ? mensaje[0] : mensaje;
                return `${nombre}: ${texto}`;
            })
            .join('\n');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        const validacionCedula = validarCedulaEC(form.cedula);
        if (!validacionCedula.valida) {
            setError(validacionCedula.mensaje);
            return;
        }
        if (form.password !== form.confirmar_password) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        if (isAgronomo === null) {
            setError('Indica si eres agrónomo o no.');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                ...form,
                profesion: isAgronomo ? 'Agrónomo' : (form.profesion || 'Otro'),
            };
            await register(payload);
            navigate('/my-dashboard');
        } catch (err) {
            setError(parseServerError(err));
        } finally {
            setLoading(false);
        }
    }

    return {
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
    };
}