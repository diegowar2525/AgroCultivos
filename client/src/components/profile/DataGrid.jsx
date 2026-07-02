/** Grilla de 2 columnas de pares label/valor, usada en las tarjetas de perfil. */
export default function DataGrid({ fields }) {
    return (
        <div className="data-grid">
            {fields.map(({ label, value }) => (
                <div className="data-grid-item" key={label}>
                    <span className="data-grid-label">{label}</span>
                    <span className="data-grid-value">{value || '—'}</span>
                </div>
            ))}
        </div>
    );
}
