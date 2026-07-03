import { HEALTH_STATUS_OPTIONS } from '../../constants/healthStatus';

export default function HealthStatusSelector({ value, onChange }) {
    return (
        <div className="my-harvests-health-options">
            {HEALTH_STATUS_OPTIONS.map(({ key, label, icon: Icon }) => (
                <button
                    key={key}
                    type="button"
                    onClick={() => onChange(key)}
                    className={`my-harvests-health-option my-harvests-health-option--${key} ${value === key ? 'is-active' : ''}`}
                >
                    <Icon size={13} />
                    {label}
                </button>
            ))}
        </div>
    );
}
