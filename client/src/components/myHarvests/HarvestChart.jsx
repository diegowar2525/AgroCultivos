import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const CHART_STATUS = [
    {
        name: 'Activos',
        estado: 'Activo',
        className: 'my-harvests-chart--active',
        color: '#4ade80',
    },
    {
        name: 'En cosecha',
        estado: 'Cosecha',
        className: 'my-harvests-chart--harvest',
        color: '#fbbf24',
    },
    {
        name: 'Completados',
        estado: 'Completado',
        className: 'my-harvests-chart--completed',
        color: '#60a5fa',
    },
    {
        name: 'Suspendidos',
        estado: 'Suspendido',
        className: 'my-harvests-chart--suspended',
        color: '#f87171',
    },
];

function ChartTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;

    const item = payload[0];
    const value = item.value;

    return (
        <div className="my-harvests-chart-tooltip">
            <strong>{item.name}</strong>
            <span>{value} cultivo{value !== 1 ? 's' : ''}</span>
        </div>
    );
}

export default function HarvestChart({ harvests }) {
    const data = CHART_STATUS.map(status => ({
        ...status,
        value: harvests.filter(harvest => harvest.estado_nombre === status.estado).length,
    })).filter(item => item.value > 0);

    if (data.length === 0) return null;

    return (
        <section className="my-harvests-side-card my-harvests-chart-card">
            <p className="my-harvests-side-card__eyebrow">Distribución</p>
            <h2 className="my-harvests-side-card__title">
                {harvests.length} cultivos en total
            </h2>

            <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                    >
                        {data.map(entry => (
                            <Cell key={entry.name} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                </PieChart>
            </ResponsiveContainer>

            <div className="my-harvests-chart-legend">
                {data.map(item => (
                    <div key={item.name} className={`my-harvests-chart-legend__item ${item.className}`}>
                        <div>
                            <span className="my-harvests-chart-legend__dot" />
                            <span>{item.name}</span>
                        </div>
                        <strong>{item.value}</strong>
                    </div>
                ))}
            </div>
        </section>
    );
}
