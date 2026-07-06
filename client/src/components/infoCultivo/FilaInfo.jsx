export default function FilaInfo({ icon: Icon, label, valor, detalle }) {
    return (
        <div className="info-fila">
            {Icon && <Icon size={15} className="info-fila-icon" />}
            <div className="info-fila-texto">
                <span className="info-fila-label">{label}</span>
                <span className="info-fila-valor">{valor}</span>
                {detalle && <span className="info-fila-detalle">{detalle}</span>}
            </div>
        </div>
    );
}
