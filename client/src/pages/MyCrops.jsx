import Navbar from '../components/layout/Navbar';
import { useMisCultivos } from '../hooks/useMisCultivos';
import CultivoCard from '../components/myCrops/CultivoCard';
import EstadoVacio from '../components/myCrops/EstadoVacio';
import UserDashboardPanel from '../components/userDashboard/UserDashboardPanel';

export default function MisCultivos() {
    const {
        cultivos,
        loading,
        iniciandoId,
        yaIniciadoIds,
        eliminandoId,
        iniciarCultivo,
        eliminarCultivo,
    } = useMisCultivos();

    return (
        <div className="mis-cultivos-page">
            <Navbar />
            <div className="mis-cultivos-container">
                <UserDashboardPanel />

                <div className="mis-cultivos-header">
                    <h1>Mis cultivos</h1>
                    <p>
                        Cultivos guardados de tus recomendaciones · presiona "Iniciar cultivo" para comenzar el seguimiento
                    </p>
                </div>

                {loading ? (
                    <p className="mis-cultivos-loading">Cargando...</p>
                ) : cultivos.length === 0 ? (
                    <EstadoVacio />
                ) : (
                    <div className="mis-cultivos-grid">
                        {cultivos.map((c) => (
                            <CultivoCard
                                key={c.id}
                                cultivo={c}
                                estaIniciando={iniciandoId === c.id}
                                yaIniciado={yaIniciadoIds.includes(c.id)}
                                estaEliminando={eliminandoId === c.id}
                                onIniciar={iniciarCultivo}
                                onEliminar={eliminarCultivo}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}