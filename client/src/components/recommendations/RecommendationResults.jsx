import { RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecommendationCard from './RecommendationCard';

export default function RecommendationResults({
    resultados,
    onNueva,
    onAgregar,
    agregarLoading,
    agregarExito,
    agregarError,
    setAgregarError,
}) {
    return (
        <section className="recommendations-results">
            <header className="recommendations-results__header">
                <div>
                    <h2 className="recommendations-results__title">Cultivos recomendados</h2>
                    <p className="recommendations-results__subtitle">
                        {resultados.length} cultivos recomendados para tu zona
                    </p>
                </div>

                <div className="recommendations-results__actions">
                    <p className="recommendations-results__subtitle">
                        Los cultivos agregados se guardan en{' '}
                        <Link to="/my-crops">
                            Mis cultivos
                        </Link>
                    </p>

                    <button
                        type="button"
                        onClick={onNueva}
                        className="recommendations-button recommendations-button--secondary"
                    >
                        <RotateCcw size={14} />
                        Nueva consulta
                    </button>
                </div>
            </header>

            {agregarError && (
                <div className="recommendations-alert recommendations-alert--error">
                    <span>⚠ {agregarError}</span>

                    <button
                        type="button"
                        onClick={() => setAgregarError('')}
                        className="recommendations-alert__close"
                        aria-label="Cerrar alerta"
                    >
                        ✕
                    </button>
                </div>
            )}

            {resultados.length === 0 ? (
                <div className="recommendations-results__empty">
                    No se encontraron cultivos compatibles con tu ubicación actual.
                </div>
            ) : (
                <div className="recommendations-grid">
                    {resultados.map((cultivo, index) => (
                        <RecommendationCard
                            key={`${cultivo.cultivo}-${index}`}
                            cultivo={cultivo}
                            index={index}
                            agregarLoading={agregarLoading}
                            agregarExito={agregarExito}
                            onAgregar={onAgregar}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
