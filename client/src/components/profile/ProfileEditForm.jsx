import { ArrowLeft, Lock, Save, User, X } from 'lucide-react';
import { useProfileEditForm } from '../../hooks/useProfileEditForm';

/** Formulario de edición de perfil (datos personales; cédula/usuario no editables). */
export default function ProfileEditForm({ user, onCancel }) {
    const { form, updateField, loading, handleSave } = useProfileEditForm(user, onCancel);

    return (
        <div className="profile-edit">
            <div className="profile-edit-header">
                <button className="profile-back-btn" onClick={onCancel}>
                    <ArrowLeft size={16} />
                </button>
                <div>
                    <h1 className="profile-edit-title">Editar mi perfil</h1>
                    <p className="profile-edit-subtitle">Los cambios se guardan al presionar el botón</p>
                </div>
            </div>

            <div className="profile-edit-grid">
                <div className="profile-card">
                    <div className="profile-section-title">
                        <Lock size={15} /> No modificables
                    </div>
                    <p className="profile-locked-hint">Solo el administrador puede modificar estos campos</p>
                    {['Cédula de identidad', 'Nombre de usuario'].map((etiqueta) => (
                        <div className="profile-locked-item" key={etiqueta}>
                            <User size={13} />
                            <span>{etiqueta}</span>
                        </div>
                    ))}
                </div>

                <div className="profile-edit-fields">
                    <div className="profile-card">
                        <div className="profile-section-title">
                            <User size={16} /> Datos personales
                        </div>
                        <div className="profile-edit-grid-2">
                            <div className="form-group">
                                <label className="field-label field-label--locked">
                                    <Lock size={11} /> Cédula de identidad
                                </label>
                                <input value={user.cedula || ''} readOnly className="input-field input-field--locked" />
                            </div>
                            <div className="form-group">
                                <label className="field-label">Nombres</label>
                                <input
                                    className="input-field"
                                    value={form.first_name}
                                    onChange={(e) => updateField('first_name', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="field-label">Apellidos</label>
                                <input
                                    className="input-field"
                                    value={form.last_name}
                                    onChange={(e) => updateField('last_name', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="field-label">Correo electrónico</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    value={form.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="field-label">Género</label>
                                <select
                                    className="input-field"
                                    value={form.genero}
                                    onChange={(e) => updateField('genero', e.target.value)}
                                >
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                    <option value="O">Otro</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="field-label">Fecha de nacimiento</label>
                                <input
                                    type="date"
                                    className="input-field"
                                    value={form.fecha_nacimiento}
                                    onChange={(e) => updateField('fecha_nacimiento', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="profile-card">
                        <div className="profile-section-title">
                            <User size={16} /> Profesión
                        </div>
                        <div className="form-group">
                            <label className="field-label">Profesión / especialidad</label>
                            <input
                                className="input-field"
                                placeholder="Ej: Agrónomo, Biólogo..."
                                value={form.profesion}
                                onChange={(e) => updateField('profesion', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-edit-actions">
                <button className="btn-primary profile-save-btn" onClick={handleSave} disabled={loading}>
                    <Save size={15} /> {loading ? 'Guardando...' : 'Guardar cambios'}
                </button>
                <button className="profile-cancel-btn" onClick={onCancel}>
                    <X size={15} /> Cancelar
                </button>
            </div>
        </div>
    );
}