import { Leaf } from 'lucide-react';

import { getPlagas } from '../../data/plagasPorCultivo';
import HealthStatusSelector from './HealthStatusSelector';
import HealthyTrackingForm from './HealthyTrackingForm';
import ObservationTrackingForm from './ObservationTrackingForm';
import PestTrackingForm from './PestTrackingForm';

export default function HarvestHealthCard({ harvest, form }) {
    const cropName = harvest.cultivo_nombre || '';
    const cropPests = getPlagas(cropName);

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

            {form.healthStatus === 'bien' && (
                <HealthyTrackingForm
                    height={form.height}
                    setHeight={form.setHeight}
                    photo={form.photo}
                    setPhoto={form.setPhoto}
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
                    observation={form.observation}
                    setObservation={form.setObservation}
                    saving={form.saving}
                    success={form.success}
                    onSave={form.saveTrackingRecord}
                />
            )}

            {form.healthStatus === 'plaga' && (
                <PestTrackingForm
                    cropName={cropName}
                    pests={cropPests}
                    pestType={form.pestType}
                    setPestType={form.setPestType}
                    observation={form.observation}
                    setObservation={form.setObservation}
                    saving={form.saving}
                    success={form.success}
                    onSave={form.saveTrackingRecord}
                />
            )}
        </section>
    );
}
