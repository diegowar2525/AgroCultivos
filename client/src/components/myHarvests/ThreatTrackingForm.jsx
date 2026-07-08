import { AlertTriangle } from 'lucide-react';

import HealthNotice from './HealthNotice';
import ObservationField from './ObservationField';
import PlantHeightField from './PlantHeightField';
import ProblemChips from './ProblemChips';
import SolutionSteps from './SolutionSteps';

export default function ThreatTrackingForm({
    cropName,
    threats,
    threatType,
    setThreatType,
    height,
    setHeight,
    observation,
    setObservation,
    saving,
    success,
    onSave,
    autoDetectedThreat = false,
    detectedThreatName = '',
}) {
    const automaticThreat = autoDetectedThreat
        ? findMatchingThreat(threats, detectedThreatName)
        : null;

    const selectedThreat = automaticThreat || threatType;

    return (
        <div className="my-harvests-form-stack">
            <HealthNotice type="amenaza" />

            <PlantHeightField
                height={height}
                setHeight={setHeight}
            />

            {!autoDetectedThreat && (
                <ManualThreatSelector
                    cropName={cropName}
                    threats={threats}
                    threatType={threatType}
                    setThreatType={setThreatType}
                />
            )}

            {selectedThreat && (
                <SolutionSteps
                    title={
                        automaticThreat
                            ? `Sugerencias para diagnóstico automático: ${selectedThreat.nombre}`
                            : `Sugerencias para: ${selectedThreat.nombre}`
                    }
                    steps={selectedThreat.pasos}
                    variant="danger"
                    icon={<AlertTriangle size={13} />}
                />
            )}

            <ObservationField
                label="Observación (opcional)"
                placeholder="Ej: manchas en hojas, amarillamiento, lesiones visibles..."
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
                {saving ? 'Guardando...' : success ? '✓ Registro guardado' : 'Guardar registro'}
            </button>
        </div>
    );
}

function findMatchingThreat(threats = [], detectedThreatName = '') {
    const normalizedDetectedName = normalizeText(detectedThreatName);

    if (!normalizedDetectedName) return null;

    return threats.find(threat => {
        const normalizedThreatName = normalizeText(threat.nombre);

        return (
            normalizedThreatName.includes(normalizedDetectedName) ||
            normalizedDetectedName.includes(normalizedThreatName)
        );
    });
}

function normalizeText(value = '') {
    return value
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

function ManualThreatSelector({
    cropName,
    threats,
    threatType,
    setThreatType,
}) {
    return (
        <>
            <div className="my-harvests-form-group">
                <p className="my-harvests-chip-title">
                    ¿Qué amenaza identificaste en <span>{cropName}</span>?
                </p>

                <ProblemChips
                    items={threats}
                    selectedItem={threatType}
                    onSelect={setThreatType}
                    variant="danger"
                />
            </div>

            {threatType && (
                <SolutionSteps
                    title={`Sugerencias para: ${threatType.nombre}`}
                    steps={threatType.pasos}
                    variant="danger"
                    icon={<AlertTriangle size={13} />}
                />
            )}
        </>
    );
}