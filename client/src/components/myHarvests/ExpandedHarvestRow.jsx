import useHarvestTrackingForm from '../../hooks/useHarvestTrackingForm';
import HarvestCycleCard from './HarvestCycleCard';
import HarvestHealthCard from './HarvestHealthCard';

export default function ExpandedHarvestRow({ harvest, onHarvestUpdated }) {
    const form = useHarvestTrackingForm(harvest, onHarvestUpdated);

    return (
        <tr className="my-harvests-expanded-row">
            <td colSpan={7} className="my-harvests-expanded-cell">
                <div className="my-harvests-expanded-grid">
                    <HarvestCycleCard
                        harvest={harvest}
                        refreshHistory={form.refreshHistory}
                        updatingStatus={form.updatingStatus}
                        onChangeStatus={form.changeHarvestStatus}
                    />

                    <HarvestHealthCard
                        harvest={harvest}
                        form={form}
                    />
                </div>
            </td>
        </tr>
    );
}
