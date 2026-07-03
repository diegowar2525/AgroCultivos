import { Clock, MapPin, Search, Sprout } from 'lucide-react';

const steps = [
    { icon: <MapPin size={15} />, label: 'Tu ubicación' },
    { icon: <Sprout size={15} />, label: 'Espacio' },
    { icon: <Clock size={15} />, label: 'Ciclo' },
    { icon: <Search size={15} />, label: 'Resultados' },
];

export default function EmptyRecommendationsState() {
    return (
        <div className="recommendations-empty">
            <div className="recommendations-empty__content">
                <div className="recommendations-empty__icon">
                    <Sprout size={34} strokeWidth={2} />
                </div>

                <div>
                    <h3 className="recommendations-empty__title">Configura tu búsqueda</h3>
                    <p className="recommendations-empty__text">
                        Selecciona el tipo de espacio y el ciclo del cultivo que prefieres,
                        luego presiona el botón para ver los mejores cultivos para tu zona.
                    </p>
                </div>

                <div className="recommendations-steps">
                    {steps.map(({ icon, label }, index) => (
                        <div key={label} className="recommendations-steps__item">
                            <div className="recommendations-step">
                                <div className="recommendations-step__icon">
                                    {icon}
                                </div>
                                <span className="recommendations-step__label">{label}</span>
                            </div>

                            {index < steps.length - 1 && (
                                <span className="recommendations-steps__arrow">→</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
