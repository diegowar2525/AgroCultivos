import { PieChart as PieChartIcon } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORES = ['#d9c66b', '#60a5fa', '#a78bfa', '#4ade80', '#f87171'];

function CategoriaTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    const item = payload[0];
    return (
        <div className="my-harvests-chart-tooltip">
            <strong>{item.name}</strong>
            <span>{item.value} cultivo{item.value !== 1 ? 's' : ''}</span>
        </div>
    );
}

/** Distribución de los cultivos del usuario por categoría, en una dona. */
export default function CategoriasCard({ categorias, totalCultivos }) {
    const data = categorias.map(({ nombre, cantidad }, i) => ({
        name: nombre,
        value: cantidad,
        color: COLORES[i % COLORES.length],
    }));

    return (
        <div className="user-dash-card user-dash-card--gauge">
            <p className="user-dash-card-titulo"><PieChartIcon size={14} /> Por categoría</p>
            {categorias.length === 0 ? (
                <p className="user-dash-vacio-texto">Aún no tienes cultivos guardados.</p>
            ) : (
                <>
                    <div className="user-dash-donut">
                        <ResponsiveContainer width="100%" height={108}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={38}
                                    outerRadius={52}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                    isAnimationActive={false}
                                >
                                    {data.map((entry) => (
                                        <Cell key={entry.name} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CategoriaTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="user-dash-donut-center">
                            <span className="user-dash-gauge-value">{totalCultivos}</span>
                        </div>
                    </div>

                    <div className="user-dash-categoria-legend">
                        {data.map((item) => (
                            <span className="user-dash-categoria-legend-item" key={item.name}>
                                <span className="user-dash-categoria-dot" style={{ backgroundColor: item.color }} />
                                {item.name}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
