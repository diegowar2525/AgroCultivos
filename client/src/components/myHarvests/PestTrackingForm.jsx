import { AlertTriangle } from 'lucide-react';

import ObservationField from './ObservationField';
import ProblemChips from './ProblemChips';
import SolutionSteps from './SolutionSteps';

export default function PestTrackingForm({
    cropName,
    pests,
    pestType,
    setPestType,
    observation,
    setObservation,
    saving,
    success,
    onSave,
}) {
    return (
        <div className="my-harvests-form-stack">
            <div className="my-harvests-form-group">
                <p className="my-harvests-chip-title">
                    ¿Qué problema identificaste en <span>{cropName}</span>?
                </p>

                <ProblemChips
                    items={pests}
                    selectedItem={pestType}
                    onSelect={setPestType}
                    variant="danger"
                />
            </div>

            {pestType && (
                <SolutionSteps
                    title={`Solución para: ${pestType.nombre}`}
                    steps={pestType.pasos}
                    variant="danger"
                    icon={<AlertTriangle size={13} />}
                />
            )}

            <ObservationField
                label="Describe el problema (opcional)"
                placeholder="Ej: manchas blancas en hojas inferiores..."
                value={observation}
                rows={2}
                onChange={setObservation}
                variant="danger"
            />

            <button
                type="button"
                onClick={onSave}
                disabled={saving}
                className={`my-harvests-save-button my-harvests-save-button--danger ${success ? 'is-success' : ''}`}
            >
                {saving ? 'Guardando...' : success ? '✓ Registrado' : 'Registrar plaga en bitácora'}
            </button>
        </div>
    );
}
