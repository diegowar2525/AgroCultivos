import HealthNotice from './HealthNotice';
import ObservationField from './ObservationField';
import ProblemChips from './ProblemChips';
import SolutionSteps from './SolutionSteps';
import { PROBLEMAS_COMUNES } from '../../data/plagasPorCultivo';

export default function ObservationTrackingForm({
    commonProblem,
    setCommonProblem,
    observation,
    setObservation,
    saving,
    success,
    onSave,
}) {
    return (
        <div className="my-harvests-form-stack">
            <HealthNotice type="observacion" />

            <div className="my-harvests-form-group">
                <p className="my-harvests-chip-title">¿Qué problema observaste?</p>

                <ProblemChips
                    items={PROBLEMAS_COMUNES}
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
                label="¿Qué observaste? (opcional)"
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
                {saving ? 'Guardando...' : success ? '✓ Guardado' : 'Guardar observación'}
            </button>
        </div>
    );
}
