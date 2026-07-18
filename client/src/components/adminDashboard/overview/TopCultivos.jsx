import { TrendingUp } from "lucide-react";
import BarraTop from "./BarraTop";

export default function TopCultivos({ stats }) {

    const maxTop = stats.topCultivos[0]?.[1] || 1;

    return (

        <div className="dashboard-card">

            <div className="card-header">

                <TrendingUp size={18} />

                <h3>Top cultivos más agregados</h3>

            </div>

            {

                stats.topCultivos.length === 0 ?

                    <p className="empty-data">
                        Sin datos aún
                    </p>

                    :

                    <div className="top-crops">

                        {

                            stats.topCultivos.map(([nombre, count], index) => (

                                <div
                                    key={nombre}
                                    className="top-item"
                                >

                                    <div className="top-item-header">

                                        <span className={`top-name top-${index + 1}`}>
                                            #{index + 1} {nombre}
                                        </span>

                                        <span className={`top-count top-${index + 1}`}>
                                            {count}
                                        </span>

                                    </div>

                                    <BarraTop
                                        pct={Math.round((count / maxTop) * 100)}
                                        index={index}
                                    />

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

}