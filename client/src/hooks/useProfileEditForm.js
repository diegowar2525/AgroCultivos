import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

/** Lógica del formulario de edición de perfil (datos personales + profesión). */
export function useProfileEditForm(user, onSaved) {
    const { updateProfile } = useAuth();

    const [form, setForm] = useState({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        genero: user.genero || '',
        fecha_nacimiento: user.fecha_nacimiento || '',
        profesion: user.profesion || '',
    });
    const [loading, setLoading] = useState(false);

    function updateField(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSave() {
        setLoading(true);
        try {
            await updateProfile(form);
            toast.success('Perfil actualizado correctamente');
            onSaved();
        } catch (err) {
            const errores = err.response?.data;
            if (errores) {
                Object.values(errores).flat().forEach((mensaje) => toast.error(mensaje));
            } else {
                toast.error('Error al guardar los cambios');
            }
        } finally {
            setLoading(false);
        }
    }

    return { form, updateField, loading, handleSave };
}