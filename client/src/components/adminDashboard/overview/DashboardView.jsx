import useDashboardStats from "@/hooks/useDashboardStats";

import DashboardStats from "./DashboardStats";
import UsuariosChart from "./UsuariosChart";
import TopCultivos from "./TopCultivos";


export default function DashboardView() {

    const { stats, loading } = useDashboardStats();

    if (loading) {

        return (

            <div className="dashboard-loading">

                Cargando estadísticas...

            </div>

        );

    }

    return (

        <div className="dashboard">


            <DashboardStats stats={stats} />

            <div className="dashboard-grid">

                <UsuariosChart stats={stats} />

                <TopCultivos stats={stats} />

            </div>

        </div>

    );

}