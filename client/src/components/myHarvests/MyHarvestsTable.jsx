import HarvestRow from './HarvestRow';
import ExpandedHarvestPanel from './ExpandedHarvestPanel';

const TABLE_HEADINGS = [
    'Cultivo',
    'Sembrado',
    'Estado',
    'Progreso',
    'Cosecha estimada',
    'Información',
    'Detalle',
];

export default function MyHarvestsTable({
    harvests,
    expandedHarvestId,
    onToggleExpanded,
    onReloadHarvests,
    onViewCropInfo,
}) {
    const expandedHarvest = harvests.find(
        harvest => harvest.id === expandedHarvestId,
    );

    return (
        <section className="my-harvests-table-card">
            <div className="my-harvests-table-wrap">
                <table className="my-harvests-table">
                    <thead>
                        <tr>
                            {TABLE_HEADINGS.map(heading => (
                                <th key={heading}>{heading}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {harvests.map(harvest => {
                            const isExpanded =
                                expandedHarvestId === harvest.id;

                            return (
                                <HarvestRow
                                    key={harvest.id}
                                    harvest={harvest}
                                    isExpanded={isExpanded}
                                    onToggle={() =>
                                        onToggleExpanded(harvest.id)
                                    }
                                    onInfo={() =>
                                        onViewCropInfo(harvest.cultivo)
                                    }
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {expandedHarvest && (
                <ExpandedHarvestPanel
                    harvest={expandedHarvest}
                    onHarvestUpdated={onReloadHarvests}
                />
            )}
        </section>
    );
}