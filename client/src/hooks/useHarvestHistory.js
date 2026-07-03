import { useEffect, useState } from 'react';
import { getTrackingRecords } from '../services/harvestsService';

export default function useHarvestHistory(cultivoId, refresh) {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        async function loadHistory() {
            setLoading(true);

            try {
                const data = await getTrackingRecords();
                if (active) {
                    setRecords(data.filter(record => record.cultivo_usuario === cultivoId));
                }
            } catch {
                if (active) setRecords([]);
            } finally {
                if (active) setLoading(false);
            }
        }

        loadHistory();

        return () => {
            active = false;
        };
    }, [cultivoId, refresh]);

    return {
        records,
        loading,
    };
}
