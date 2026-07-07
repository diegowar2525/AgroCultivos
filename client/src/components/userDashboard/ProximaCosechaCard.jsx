import { CalendarClock } from 'lucide-react';
import RadialGauge from './RadialGauge';

/** La cosecha activa más próxima a completarse, con un anillo de progreso del ciclo. */
export default function ProximaCosechaCard({ proximaCosecha, diasNumero, progresoCosecha }) {
    return (
        <div className="user-dash-card user-dash-card--gauge">
            <p className="user-dash-card-titulo"><CalendarClock size={14} /> Próxima cosecha</p>
            {proximaCosecha ? (
                <>
                    <RadialGauge
                        pct={progresoCosecha}
                        color="#60a5fa"
                        centerValue={`${diasNumero}d`}
                        centerLabel="restantes"
                    />
                    <p className="user-dash-gauge-caption">{proximaCosecha.cultivo_nombre}</p>
                </>
            ) : (
                <p className="user-dash-vacio-texto">No tienes cultivos en seguimiento todavía.</p>
            )}
        </div>
    );
}
