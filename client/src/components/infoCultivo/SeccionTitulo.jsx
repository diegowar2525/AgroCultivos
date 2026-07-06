export default function SeccionTitulo({ icon: Icon, titulo }) {
    return (
        <div className="info-seccion-titulo">
            {Icon && <Icon size={16} />}
            <span>{titulo}</span>
        </div>
    );
}
