import {

    Users,

    ClipboardList,

    Leaf,

    Sprout,

} from "lucide-react";

import StatCard from "./StatCard";

export default function DashboardStats({ stats }) {

    return (

        <div className="dashboard-stats">

            <StatCard

                icon={<Users size={20} />}

                label="Total de usuarios"

                value={stats.totalUsuarios}

                sub="Usuarios registrados en el sistema"

            />

            <StatCard

                icon={<ClipboardList size={20} />}

                label="Total de consultas"

                value={stats.totalConsultas}

                sub="Recomendaciones solicitadas"

            />

            <StatCard

                icon={<Leaf size={20} />}

                label="Cultivo más agregado"

                value={stats.masRecomendado?.nombre || "—"}

                sub={
                    stats.masRecomendado
                        ? `${stats.masRecomendado.count} veces agregado`
                        : "Sin datos aún"
                }

            />

            <StatCard

                icon={<Sprout size={20} />}

                label="Agrónomos vs otros"

                value={`${stats.pctAgronomo}%`}

                sub={`${stats.agronomos} agrónomos · ${stats.noAgronomos} otros`}

            />

        </div>

    );

}