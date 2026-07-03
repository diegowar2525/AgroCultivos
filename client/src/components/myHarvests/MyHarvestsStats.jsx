export default function MyHarvestsStats({ stats }) {
    return (
        <section className="my-harvests-stats" aria-label="Resumen de cosechas">
            {stats.map(({ label, value, variant }) => (
                <article key={label} className="my-harvests-stat-card">
                    <p>{label}</p>
                    <strong className={`my-harvests-stat-value my-harvests-stat-value--${variant}`}>
                        {value}
                    </strong>
                </article>
            ))}
        </section>
    );
}
