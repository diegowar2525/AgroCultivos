import { Clock } from 'lucide-react';

/** Línea de tiempo corta con la actividad reciente del usuario. */
export default function ActividadReciente({ actividad }) {
    return (
        <div className="user-dash-card user-dash-card--actividad">
            <p className="user-dash-card-titulo"><Clock size={14} /> Actividad reciente</p>
            {actividad.length === 0 ? (
                <p className="user-dash-vacio-texto">Aún no hay actividad registrada.</p>
            ) : (
                <div className="user-dash-actividad-lista">
                    {actividad.map((item) => (
                        <div className="user-dash-actividad-item" key={item.id}>
                            <span className="user-dash-actividad-punto" />
                            <div>
                                <p className="user-dash-actividad-texto">{item.texto}</p>
                                <p className="user-dash-actividad-detalle">
                                    {item.detalle && `${item.detalle} · `}
                                    {new Date(item.fecha).toLocaleDateString('es-EC', { day: 'numeric', month: 'short' })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}