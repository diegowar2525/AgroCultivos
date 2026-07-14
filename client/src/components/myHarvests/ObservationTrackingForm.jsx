import HealthNotice from './HealthNotice';
import ObservationField from './ObservationField';
import PlantHeightField from './PlantHeightField';
import ProblemChips from './ProblemChips';
import SolutionSteps from './SolutionSteps';
import { COMMON_PROBLEMS } from '../../data/ThreatsPerCrop';

export default function ObservationTrackingForm({
    commonProblem,
    setCommonProblem,
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
            <HealthNotice type="observacion" />

            <PlantHeightField
                height={height}
                setHeight={setHeight}
            />

            <div className="my-harvests-form-group">
                <p className="my-harvests-chip-title">¿Qué problema observaste?</p>

                <ProblemChips
                    items={COMMON_PROBLEMS}
                    selectedItem={commonProblem}
                    onSelect={setCommonProblem}
                    variant="warning"
                />
            </div>

            {commonProblem && (
                <SolutionSteps
                    title={`Solución para: ${commonProblem.nombre}`}
                    steps={commonProblem.pasos}
                    variant="warning"
                />
            )}

            <ObservationField
                label="Observación (opcional)"
                placeholder="Ej: manchas leves en hojas inferiores..."
                value={observation}
                rows={3}
                onChange={setObservation}
                variant="warning"
            />

            <button
                type="button"
                onClick={onSave}
                disabled={saving}
                className={`my-harvests-save-button my-harvests-save-button--warning ${success ? 'is-success' : ''}`}
            >
                {saving ? 'Guardando...' : success ? '✓ Registro guardado' : 'Guardar registro'}
            </button>
        </div>
    );
}