import { useCallback, useEffect, useMemo, useState } from 'react';
import { getStartedHarvests } from '../services/harvestsService';

export default function useMyHarvests() {
    const [harvests, setHarvests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedHarvestId, setExpandedHarvestId] = useState(null);

    const loadHarvests = useCallback(async () => {
        setLoading(true);

        try {
            const data = await getStartedHarvests();
            setHarvests(data);
        } catch {
            setHarvests([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadHarvests();
    }, [loadHarvests]);

    const stats = useMemo(() => [
        {
            label: 'Total activos',
            value: harvests.filter(harvest => harvest.estado_nombre === 'Activo').length,
            variant: 'activo',
        },
        {
            label: 'En cosecha',
            value: harvests.filter(harvest => harvest.estado_nombre === 'Cosecha').length,
            variant: 'cosecha',
        },
        {
            label: 'Completados',
            value: harvests.filter(harvest => harvest.estado_nombre === 'Completado').length,
            variant: 'completado',
        },
        {
            label: 'Total cultivos',
            value: harvests.length,
            variant: 'total',
        },
    ], [harvests]);

    function toggleExpandedHarvest(harvestId) {
        setExpandedHarvestId(currentId => currentId === harvestId ? null : harvestId);
    }

    return {
        harvests,
        loading,
        stats,
        expandedHarvestId,
        toggleExpandedHarvest,
        reloadHarvests: loadHarvests,
    };
}
