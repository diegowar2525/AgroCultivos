import { useUserDashboard } from '../../hooks/useUserDashboard';
import DashboardSaludo from './DashboardSaludo';
import DashboardStats from './DashboardStats';
import NivelCard from './NivelCard';
import ProximaCosechaCard from './ProximaCosechaCard';
import CategoriasCard from './CategoriasCard';
import ActividadReciente from './ActividadReciente';

/** Panel de resumen mostrado arriba de la lista de cultivos guardados. */
export default function UserDashboardPanel() {
    const {
        loading,
        stats,
        nivel,
        siguienteNivel,
        progresoNivel,
        proximaCosecha,
        diasNumero,
        progresoCosecha,
        categorias,
        totalCultivos,
        actividad,
    } = useUserDashboard();

    if (loading) return null;

    return (
        <div className="user-dash-panel">
            <DashboardSaludo />
            <DashboardStats stats={stats} />

            <div className="user-dash-gauges">
                <NivelCard
                    nivel={nivel}
                    siguienteNivel={siguienteNivel}
                    progresoNivel={progresoNivel}
                    completados={stats.completados}
                />
                <ProximaCosechaCard
                    proximaCosecha={proximaCosecha}
                    diasNumero={diasNumero}
                    progresoCosecha={progresoCosecha}
                />
                <CategoriasCard categorias={categorias} totalCultivos={totalCultivos} />
            </div>

            <ActividadReciente actividad={actividad} />
        </div>
    );
}
