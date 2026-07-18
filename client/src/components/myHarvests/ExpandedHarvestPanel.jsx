import useHarvestTrackingForm from '../../hooks/useHarvestTrackingForm';
import HarvestCycleCard from './HarvestCycleCard';
import HarvestHealthCard from './HarvestHealthCard';
import SuspendedNotice from './SuspendedNotice';

export default function ExpandedHarvestPanel({
    harvest,
    onHarvestUpdated,
}) {
    const form = useHarvestTrackingForm(harvest, onHarvestUpdated);
    const estaSuspendido = harvest.estado_nombre === 'Suspendido';

    return (
        <div className="my-harvests-expanded-panel">
            <div className="my-harvests-expanded-grid">
                <HarvestCycleCard
                    harvest={harvest}
                    refreshHistory={form.refreshHistory}
                    updatingStatus={form.updatingStatus}
                    onChangeStatus={form.changeHarvestStatus}
                />

                {estaSuspendido ? (
                    <SuspendedNotice />
                ) : (
                    <HarvestHealthCard
                        harvest={harvest}
                        form={form}
                    />
                )}
            </div>
        </div>
    );
}