import {
    DEFAULT_LEVEL_CLASS,
    LEVEL_CLASS,
} from '../../constants/recommendations';

export default function CompatibilityBar({ value, nivel }) {
    const levelClass = LEVEL_CLASS[nivel] || DEFAULT_LEVEL_CLASS;

    return (
        <div
            className={`recommendations-compat-bar ${levelClass}`}
            style={{ '--compat-width': `${value}%` }}
            aria-label={`Compatibilidad ${value}%`}
        >
            <div className="recommendations-compat-bar__fill" />
        </div>
    );
}
