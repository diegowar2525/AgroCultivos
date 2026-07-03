import React from 'react';

import ExpandedHarvestRow from './ExpandedHarvestRow';
import HarvestRow from './HarvestRow';

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
                            const isExpanded = expandedHarvestId === harvest.id;

                            return (
                                <React.Fragment key={harvest.id}>
                                    <HarvestRow
                                        harvest={harvest}
                                        isExpanded={isExpanded}
                                        onToggle={() => onToggleExpanded(harvest.id)}
                                        onInfo={() => onViewCropInfo(harvest.cultivo)}
                                    />

                                    {isExpanded && (
                                        <ExpandedHarvestRow
                                            harvest={harvest}
                                            onHarvestUpdated={onReloadHarvests}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
