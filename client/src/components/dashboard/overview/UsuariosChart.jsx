import { Users } from "lucide-react";

export default function UsuariosChart({ stats }) {

    const maxMes = Math.max(...stats.porMes.map((m) => m.count), 1);

    return (
        <div className="dashboard-card">

            <div className="card-header">

                <div className="card-icon">
                    <Users size={20} />
                </div>

                <h3>Usuarios por día (últimos 7 días)</h3>

            </div>

            <div className="users-chart">

                {stats.porMes.map(({ label, count }) => {

                    const pct = (count / maxMes) * 100;

                    return (

                        <div
                            key={label}
                            className="users-chart-column"
                        >

                            {count > 0 &&
                                <span className="chart-value">
                                    {count}
                                </span>
                            }

                            <div
                                className="chart-bar"
                                style={{
                                    height: `${Math.max(pct, 4)}%`
                                }}
                            />

                            <span className="chart-label">
                                {label}
                            </span>

                        </div>

                    );

                })}

            </div>

        </div>
    );

}