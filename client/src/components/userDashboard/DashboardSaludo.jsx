import { useAuth } from '../../contexts/AuthContext';

export default function DashboardSaludo() {
    const { user } = useAuth();

    return (
        <div className="user-dash-saludo">
            <p className="user-dash-saludo-nombre">Hola, {user?.first_name || user?.username}</p>
            <p className="user-dash-saludo-sub">Aquí está el resumen de tu actividad</p>
        </div>
    );
}
