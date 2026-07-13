import { useAuth } from '../../contexts/AuthContext';

export default function DashboardSaludo() {
    const { user } = useAuth();

    return (
        <div className="mis-cultivos-container">
            <h1 className="mis-cultivos-header">Resumen de tu actividad</h1>
        </div>
    );
}
