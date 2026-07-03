import { Clock, Search, Sprout } from 'lucide-react';
import {
    CYCLE_OPTIONS,
    SPACE_OPTIONS,
} from '../../constants/recommendations';
import LocationSummary from './LocationSummary';

export default function RecommendationsSidebar({
    espacio,
    setEspacio,
    ciclo,
    setCiclo,
    zona,
    error,
    loading,
    onBuscar,
}) {
    return (
        <aside className="recommendations-sidebar">
            <h2 className="recommendations-sidebar__title">Buscar cultivos</h2>

            <LocationSummary zona={zona} />

            {error && (
                <div className="recommendations-alert recommendations-alert--error">
                    ⚠ {error}
                </div>
            )}

            <div className="recommendations-filter">
                <label className="recommendations-filter__label">
                    Tipo de espacio
                </label>

                <div className="recommendations-space-options">
                    {SPACE_OPTIONS.map(option => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => setEspacio(option)}
                            className={`recommendations-option recommendations-option--space ${espacio === option ? 'recommendations-option--active' : ''}`}
                        >
                            <Sprout size={18} />
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <div className="recommendations-filter">
                <label className="recommendations-filter__label">
                    Ciclo del cultivo
                </label>

                <div className="recommendations-cycle-options">
                    {CYCLE_OPTIONS.map(({ label, tipo }) => (
                        <button
                            key={tipo}
                            type="button"
                            onClick={() => setCiclo(tipo)}
                            className={`recommendations-option recommendations-option--cycle ${ciclo === tipo ? 'recommendations-option--active' : ''}`}
                        >
                            <span>
                                <Clock size={14} />
                                {label}
                            </span>
                            <small>{tipo}</small>
                        </button>
                    ))}
                </div>
            </div>

            <button
                type="button"
                onClick={onBuscar}
                disabled={loading}
                className="recommendations-button recommendations-button--primary recommendations-search-button"
            >
                {loading ? (
                    <>
                        <span className="recommendations-spinner" />
                        Buscando...
                    </>
                ) : (
                    <>
                        <Search size={16} />
                        Obtener recomendaciones
                    </>
                )}
            </button>
        </aside>
    );
}
