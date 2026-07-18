import {
    DEFAULT_LEVEL_CLASS,
    LEVEL_CLASS,
} from '../../constants/recommendations';
import { Link } from 'react-router-dom';
import CompatibilityBar from './CompatibilityBar';

export default function RecommendationCard({
    cultivo,
    index,
    agregarLoading,
    agregarExito,
    onAgregar,
}) {
    const getImageUrl = image => {
        if (!image) {
            return null;
        }

        if (
            image.startsWith('http://') ||
            image.startsWith('https://') ||
            image.startsWith('blob:')
        ) {
            return image;
        }

        const apiUrl =
            import.meta.env.VITE_API_URL?.replace(/\/$/, '') ||
            'http://localhost:8000';

        const normalizedImage = image.startsWith('/')
            ? image
            : `/${image}`;

        return `${apiUrl}${normalizedImage}`;
    };

    const levelClass = LEVEL_CLASS[cultivo.nivel] || DEFAULT_LEVEL_CLASS;
    const loading = agregarLoading === cultivo.cultivo;
    const added = agregarExito?.includes(cultivo.cultivo);
    const imageUrl = getImageUrl(cultivo.imagen);

    const ranges = [
        ['🌡', cultivo.rango_temp],
        ['💧', cultivo.rango_humedad],
        ['🏔', cultivo.rango_altitud],
        ['🌧', cultivo.rango_precip],
    ];

    return (
        <article className="recommendations-card">
            <div className="recommendations-card__header">
                <div className="recommendations-card__main">
                    <h3 className="recommendations-card__title">
                        {cultivo.cultivo}
                    </h3>

                    <p className="recommendations-card__meta">
                        {cultivo.ciclo} · {cultivo.tipo_siembra}
                    </p>
                </div>

                <div className="recommendations-score">
                    <p className={`recommendations-score__value ${levelClass}`}>
                        {cultivo.score}%
                    </p>

                    <span
                        className={`recommendations-score__badge ${levelClass}`}
                    >
                        {cultivo.nivel}
                    </span>
                </div>
            </div>

            <CompatibilityBar
                value={cultivo.score}
                nivel={cultivo.nivel}
            />

            <div className="recommendations-card__image-wrapper">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={`Imagen de ${cultivo.cultivo}`}
                        className="recommendations-card__image"
                        loading="lazy"
                    />
                ) : (
                    <div className="recommendations-card__image-empty">
                        Sin imagen disponible
                    </div>
                )}
            </div>

            <p className="recommendations-card__description">
                {cultivo.justificacion}
            </p>

            <div className="recommendations-card__ranges">
                {ranges.map(([icon, value]) => (
                    <p key={`${cultivo.cultivo}-${index}-${icon}-${value}`}>
                        {icon} {value}
                    </p>
                ))}
            </div>

            {added ? (
                <div className="recommendations-added">
                    <Link
                        to="/my-crops"
                        className="recommendations-results__link"
                    >
                        ✓ Agregado a Mis cultivos
                    </Link>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() =>
                        onAgregar(cultivo.cultivo, cultivo.ciclo)
                    }
                    disabled={loading}
                    className="recommendations-button recommendations-button--outline recommendations-card__button"
                >
                    {loading ? 'Guardando...' : 'Guardar cultivo'}
                </button>
            )}
        </article>
    );
}