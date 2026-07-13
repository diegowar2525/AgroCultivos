import { toast } from 'react-toastify';
import {
    DEFAULT_LEVEL_CLASS,
    LEVEL_CLASS,
} from '../../constants/recommendations';
import CompatibilityBar from './CompatibilityBar';
import ConfirmationToast from '../common/ConfirmationToast';

export default function RecommendationCard({
    cultivo,
    index,
    agregarLoading,
    agregarExito,
    onAgregar,
}) {
    const levelClass = LEVEL_CLASS[cultivo.nivel] || DEFAULT_LEVEL_CLASS;
    const loading = agregarLoading === cultivo.cultivo;
    const added = agregarExito?.includes(cultivo.cultivo);

    const ranges = [
        ['🌡', cultivo.rango_temp],
        ['💧', cultivo.rango_humedad],
        ['🏔', cultivo.rango_altitud],
        ['🌧', cultivo.rango_precip],
    ];

    const solicitarConfirmacion = () => {
        toast(
            ({ closeToast }) => (
                <ConfirmationToast
                    closeToast={closeToast}
                    message={`¿Estás seguro de agregar ${cultivo.cultivo} a Mis cultivos?`}
                    confirmLabel="Sí, agregar"
                    confirmClassName="btn-toast-confirm"
                    onConfirm={() =>
                        onAgregar(cultivo.cultivo, cultivo.ciclo)
                    }
                />
            ),
            {
                autoClose: false,
                closeButton: false,
                closeOnClick: false,
                draggable: false,
            }
        );
    };

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

                    <span className={`recommendations-score__badge ${levelClass}`}>
                        {cultivo.nivel}
                    </span>
                </div>
            </div>

            <CompatibilityBar
                value={cultivo.score}
                nivel={cultivo.nivel}
            />

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
                    ✓ Agregado a Mis cultivos
                </div>
            ) : (
                <button
                    type="button"
                    onClick={solicitarConfirmacion}
                    disabled={loading}
                    className="recommendations-button recommendations-button--outline recommendations-card__button"
                >
                    {loading ? 'Guardando...' : 'Agregar cultivo'}
                </button>
            )}
        </article>
    );
}