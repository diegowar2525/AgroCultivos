import { Leaf } from 'lucide-react';

import { getThreats } from '../../data/ThreatsPerCrop';
import HealthStatusSelector from './HealthStatusSelector';
import HealthyTrackingForm from './HealthyTrackingForm';
import ObservationTrackingForm from './ObservationTrackingForm';
import ThreatTrackingForm from './ThreatTrackingForm';
import TrackingImageAnalyzer from './TrackingImageAnalyzer';

export default function HarvestHealthCard({ harvest, form }) {
    const cropName = harvest.cultivo_nombre || '';
    const cropThreats = getThreats(cropName);

    return (
        <section className={`my-harvests-expanded-card my-harvests-health-card my-harvests-health-card--${form.healthStatus}`}>
            <p className="my-harvests-expanded-title my-harvests-health-title">
                <Leaf size={14} />
                Salud del cultivo
            </p>

            <HealthStatusSelector
                value={form.healthStatus}
                onChange={form.changeHealthStatus}
            />

            {form.errorMessage && (
                <div className="my-harvests-form-alert">
                    ⚠ {form.errorMessage}
                </div>
            )}

            <TrackingImageAnalyzer
                photo={form.photo}
                setPhoto={form.setPhoto}
                detectingThreat={form.detectingThreat}
                detectionResult={form.detectionResult}
                detectionError={form.detectionError}
                onAnalyze={form.analyzeThreatFromPhoto}
            />

            {form.healthStatus === 'bien' && (
                <HealthyTrackingForm
                    height={form.height}
                    setHeight={form.setHeight}
                    observation={form.observation}
                    setObservation={form.setObservation}
                    saving={form.saving}
                    success={form.success}
                    onSave={form.saveTrackingRecord}
                />
            )}

            {form.healthStatus === 'observacion' && (
                <ObservationTrackingForm
                    commonProblem={form.commonProblem}
                    setCommonProblem={form.setCommonProblem}
                    height={form.height}
                    setHeight={form.setHeight}
                    observation={form.observation}
                    setObservation={form.setObservation}
                    saving={form.saving}
                    success={form.success}
                    onSave={form.saveTrackingRecord}
                />
            )}

            {form.healthStatus === 'amenaza' && (
                <ThreatTrackingForm
                    cropName={cropName}
                    threats={cropThreats}
                    threatType={form.threatType}
                    setThreatType={form.setThreatType}
                    height={form.height}
                    setHeight={form.setHeight}
                    observation={form.observation}
                    setObservation={form.setObservation}
                    saving={form.saving}
                    success={form.success}
                    onSave={form.saveTrackingRecord}
                    autoDetectedThreat={Boolean(form.detectionResult?.prediccion)}
                    detectedThreatName={form.detectionResult?.prediccion?.amenaza}
                />
            )}
        </section>
    );
}