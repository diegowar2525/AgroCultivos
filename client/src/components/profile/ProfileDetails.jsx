import { User, CreditCard, CircleAlert, Pencil, Trash2 } from 'lucide-react';
import DataGrid from './DataGrid';

const GENERO_LABELS = { M: 'Masculino', F: 'Femenino', O: 'Otro' };

/** Contenido principal del perfil en modo lectura. */
export default function ProfileDetails({ user, onEdit, onEliminarCuenta, eliminando }) {
    const generoLabel = GENERO_LABELS[user.genero] || user.genero || '—';

    return (
        <div className="profile-main">
            <div className="profile-main-header">
                <div>
                    <h2 className="profile-main-title">Mi perfil</h2>
                    <p className="profile-main-subtitle">Tu información personal y de la cuenta</p>
                </div>
                <button className="profile-edit-btn" onClick={onEdit}>
                    <Pencil size={14} /> Editar perfil
                </button>
            </div>

            <div className="profile-card">
                <div className="profile-section-title">
                    <User size={16} /> Datos personales
                </div>
                <DataGrid fields={[
                    { label: 'Cédula de identidad', value: user.cedula },
                    { label: 'Nombres', value: user.first_name },
                    { label: 'Apellidos', value: user.last_name },
                    { label: 'Correo electrónico', value: user.email },
                    { label: 'Género', value: generoLabel },
                    { label: 'Fecha de nacimiento', value: user.fecha_nacimiento },
                ]} />
            </div>

            <div className="profile-card">
                <div className="profile-section-title">
                    <CreditCard size={16} /> Cuenta
                </div>
                <DataGrid fields={[
                    { label: 'Nombre de usuario', value: `@${user.username}` },
                    { label: 'Profesión', value: user.profesion },
                    { label: 'Contraseña', value: '••••••••' },
                ]} />
            </div>

            <div className="profile-card profile-card--danger">
                <div className="profile-section-title profile-section-title--danger">
                    <CircleAlert size={16} /> Zona de riesgo
                </div>
                <div className="profile-danger-row">
                    <div>
                        <div className="profile-danger-label">Eliminar mi cuenta</div>
                        <div className="profile-danger-hint">Esta acción es permanente y no se la puede deshacer</div>
                    </div>
                    <button className="profile-danger-btn" onClick={onEliminarCuenta} disabled={eliminando}>
                        <Trash2 size={14} /> {eliminando ? 'Eliminando...' : 'Eliminar cuenta'}
                    </button>
                </div>
            </div>
        </div>
    );
}