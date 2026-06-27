import { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function Profile() {
    const { user, updateProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    
    const [form, setForm] = useState({
        cedula: '',
        first_name: '',
        last_name: '',
        email: '',
        genero: '',
        fecha_nacimiento: '',
        profesion: '',
    });

    // Sincronizar datos del usuario logueado
    useEffect(() => {
        if (user) {
            setForm({
                cedula: user.cedula || '',
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                genero: user.genero || '',
                fecha_nacimiento: user.fecha_nacimiento || '',
                profesion: user.profesion || '',
            });
        }
    }, [user]);

    // Manejador dinámico único para TODOS los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            await updateProfile(form);
            toast.success('Perfil actualizado correctamente');
        } catch (err) {
            console.error(err);
            const errors = err.response?.data;

            if (errors) {
                const errorList = Object.values(errors).flat();
                toast.error(
                    <div className="toast-error-list-container">
                        <p className="toast-error-list-title">Error</p>
                        <ul className="toast-error-list">
                            {errorList.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                );
            } else {
                toast.error('Error al actualizar el perfil');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="app-layout"> {/* Usando tu layout global */}
            <Navbar />

            <main className="profile-container">
                <div className="glass-card">
                    <h2 className="card-title">Mi Perfil</h2>
                    <p className="card-subtitle">Actualiza tu información personal</p>

                    <form onSubmit={handleSubmit} className="form-container">
                        
                        <div className="form-group">
                            <label className="field-label">Cédula</label>
                            <input
                                type="text"
                                name="cedula"
                                className="input-field"
                                value={form.cedula}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="field-label">Nombres</label>
                            <input
                                type="text"
                                name="first_name"
                                className="input-field"
                                value={form.first_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="field-label">Apellidos</label>
                            <input
                                type="text"
                                name="last_name"
                                className="input-field"
                                value={form.last_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="field-label">Correo electrónico</label>
                            <input
                                type="email"
                                name="email"
                                className="input-field"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="field-label">Género</label>
                            <select
                                name="genero"
                                className="input-field"
                                value={form.genero}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="O">Otro</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="field-label">Fecha de nacimiento</label>
                            <input
                                type="date"
                                name="fecha_nacimiento"
                                className="input-field"
                                value={form.fecha_nacimiento}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="field-label">Profesión</label>
                            <input
                                type="text"
                                name="profesion"
                                className="input-field"
                                value={form.profesion}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary">
                            {loading ? 'Guardando cambios...' : 'Guardar cambios'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}