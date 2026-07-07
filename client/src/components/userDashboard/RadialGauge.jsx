import { PieChart, Pie, Cell } from 'recharts';

/**
 * Anillo de progreso circular con un valor al centro. Reutilizado por
 * "Tu nivel" y "Próxima cosecha" para no repetir el mismo boilerplate
 * de recharts dos veces.
 */
export default function RadialGauge({ pct, color, centerValue, centerLabel, size = 108 }) {
    const data = [
        { value: pct },
        { value: 100 - pct },
    ];

    return (
        <div className="user-dash-gauge" style={{ width: size, height: size }}>
            <PieChart width={size} height={size}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={size * 0.36}
                    outerRadius={size * 0.44}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                    isAnimationActive={false}
                >
                    <Cell fill={color} />
                    <Cell fill="rgba(251,250,243,0.1)" />
                </Pie>
            </PieChart>
            <div className="user-dash-gauge-center">
                <span className="user-dash-gauge-value">{centerValue}</span>
                {centerLabel && <span className="user-dash-gauge-label">{centerLabel}</span>}
            </div>
        </div>
    );
}