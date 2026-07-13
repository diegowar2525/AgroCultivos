import { User } from 'lucide-react';

/** Fila clickeable de un usuario en la lista lateral. */
export default function UserListItem({ usuario, seleccionado, onClick }) {
    return (
        <button
            className={`user-activity-item ${seleccionado ? 'user-activity-item--activo' : ''}`}
            onClick={onClick}
        >
            <div className="user-activity-item-avatar">
                <User size={15} />
            </div>
            <div className="user-activity-item-texto">
                <p className="user-activity-item-nombre">{usuario.first_name} {usuario.last_name}</p>
                <p className="user-activity-item-username">@{usuario.username}</p>
            </div>
        </button>
    );
}
