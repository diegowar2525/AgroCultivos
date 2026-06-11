import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function Profile() {
    const { user, updateProfile } = useAuth();

    const [form, setForm] = useState({
        cedula: '',
        first_name: '',
        last_name: '',
        email: '',
        genero: '',
        fecha_nacimiento: '',
        profesion: '',
    });

    const [loading, setLoading] = useState(false);

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

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);

        try {
            await updateProfile(form);

            toast.success(
                'Perfil actualizado correctamente'
            );

        } catch (err) {

            console.error(err);

            const errors = err.response?.data;

            if (errors) {

                const message = Object.values(errors)
                    .flat()
                    .join('\n');

                toast.error(message);

            } else {

                toast.error(
                    'Error al actualizar el perfil'
                );

            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="app-container">

            <Navbar />

            <div
                style={{
                    maxWidth: '900px',
                    margin: '2rem auto',
                    padding: '0 1rem'
                }}
            >

                <div className="glass-card">

                    <h2 className="card-title">
                        Mi Perfil
                    </h2>

                    <p className="card-subtitle">
                        Actualiza tu información personal
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label className="field-label">
                                Cédula
                            </label>

                            <input
                                type="text"
                                className="input-field"
                                value={form.cedula}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        cedula: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label className="field-label">
                                Nombres
                            </label>

                            <input
                                type="text"
                                className="input-field"
                                value={form.first_name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        first_name: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label className="field-label">
                                Apellidos
                            </label>

                            <input
                                type="text"
                                className="input-field"
                                value={form.last_name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        last_name: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label className="field-label">
                                Correo electrónico
                            </label>

                            <input
                                type="email"
                                className="input-field"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label className="field-label">
                                Género
                            </label>

                            <select
                                className="input-field"
                                value={form.genero}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        genero: e.target.value
                                    })
                                }
                            >
                                <option value="">
                                    Seleccione
                                </option>

                                <option value="M">
                                    Masculino
                                </option>

                                <option value="F">
                                    Femenino
                                </option>

                                <option value="O">
                                    Otro
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="field-label">
                                Fecha de nacimiento
                            </label>

                            <input
                                type="date"
                                className="input-field"
                                value={form.fecha_nacimiento}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        fecha_nacimiento: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label className="field-label">
                                Profesión
                            </label>

                            <input
                                type="text"
                                className="input-field"
                                value={form.profesion}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        profesion: e.target.value
                                    })
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                        >
                            {loading
                                ? 'Guardando cambios...'
                                : 'Guardar cambios'}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}