export default function HarvestProgressBar({ value }) {
    const progressClass = value >= 90
        ? 'harvest-progress-bar harvest-progress-bar--warning'
        : 'harvest-progress-bar';

    return (
        <div
            className={progressClass}
            style={{ '--progress-value': `${value}%` }}
            aria-label={`Progreso ${value}%`}
        >
            <div className="harvest-progress-bar__fill" />
        </div>
    );
}
