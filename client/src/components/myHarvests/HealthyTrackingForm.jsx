import HealthNotice from './HealthNotice';
import ObservationField from './ObservationField';
import PlantHeightField from './PlantHeightField';

export default function HealthyTrackingForm({
    height,
    setHeight,
    observation,
    setObservation,
    saving,
    success,
    onSave,
}) {
    return (
        <div className="my-harvests-form-stack">
            <HealthNotice type="bien" />

            <PlantHeightField
                height={height}
                setHeight={setHeight}
            />

            <ObservationField
                label="Observación (opcional)"
                placeholder="Ej: hojas verdes, buen crecimiento..."
                value={observation}
                rows={2}
                onChange={setObservation}
            />

            <button
                type="button"
                onClick={onSave}
                disabled={saving}
                className={`my-harvests-save-button my-harvests-save-button--good ${success ? 'is-success' : ''}`}
            >
                {saving ? 'Guardando...' : success ? '✓ Registro guardado' : 'Guardar registro'}
            </button>
        </div>
    );
}