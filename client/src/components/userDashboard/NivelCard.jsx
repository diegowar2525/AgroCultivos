import { Award } from 'lucide-react';
import RadialGauge from './RadialGauge';

/** Nivel actual del usuario y su progreso hacia el siguiente, en un anillo. */
export default function NivelCard({ nivel, siguienteNivel, progresoNivel, completados }) {
    return (
        <div className="user-dash-card user-dash-card--gauge">
            <p className="user-dash-card-titulo"><Award size={14} /> Tu nivel</p>
            <RadialGauge
                pct={progresoNivel}
                color={nivel.color}
                centerValue={`${progresoNivel}%`}
                centerLabel={nivel.nombre}
            />
            <p className="user-dash-gauge-caption">
                {siguienteNivel
                    ? `${completados} de ${siguienteNivel.min} para subir`
                    : 'Nivel máximo alcanzado'}
            </p>
        </div>
    );
}