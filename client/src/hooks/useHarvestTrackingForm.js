import { useState } from 'react';
import { createTrackingRecord, updateHarvestStatus } from '../services/harvestsService';

function getFenologicalStatus(healthStatus, pestType) {
    if (healthStatus === 'bien') return 'Crecimiento';
    if (healthStatus === 'observacion') return 'En observación';
    return `Plaga: ${pestType?.nombre || 'desconocida'}`;
}

function parseApiError(error) {
    const data = error.response?.data;

    if (typeof data === 'object' && data !== null) {
        return Object.entries(data)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value[0] : value}`)
            .join(', ');
    }

    return 'Error al guardar.';
}

export default function useHarvestTrackingForm(cultivo, onCultivoActualizado) {
    const [healthStatus, setHealthStatus] = useState('bien');
    const [pestType, setPestType] = useState(null);
    const [commonProblem, setCommonProblem] = useState(null);
    const [observation, setObservation] = useState('');
    const [photo, setPhoto] = useState(null);
    const [height, setHeight] = useState('');
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [refreshHistory, setRefreshHistory] = useState(0);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    function clearForm() {
        setPestType(null);
        setCommonProblem(null);
        setObservation('');
        setPhoto(null);
        setHeight('');
        setErrorMessage('');
        setSuccess(false);
    }

    function changeHealthStatus(nextStatus) {
        setHealthStatus(nextStatus);
        clearForm();
    }

    async function saveTrackingRecord() {
        setSaving(true);
        setErrorMessage('');

        try {
            await createTrackingRecord({
                cultivoUsuarioId: cultivo.id,
                altura: height,
                estadoFenologico: getFenologicalStatus(healthStatus, pestType),
                observaciones: observation,
                foto: photo,
            });

            setSuccess(true);
            setRefreshHistory(value => value + 1);

            setTimeout(() => {
                setSuccess(false);
                setObservation('');
                setHeight('');
                setPhoto(null);
            }, 2500);
        } catch (error) {
            setErrorMessage(parseApiError(error));
        } finally {
            setSaving(false);
        }
    }

    async function changeHarvestStatus(statusId) {
        setUpdatingStatus(true);

        try {
            await updateHarvestStatus(cultivo.id, statusId);
            onCultivoActualizado();
        } catch {
            setErrorMessage('Error al actualizar el estado.');
        } finally {
            setUpdatingStatus(false);
        }
    }

    return {
        healthStatus,
        changeHealthStatus,
        pestType,
        setPestType,
        commonProblem,
        setCommonProblem,
        observation,
        setObservation,
        photo,
        setPhoto,
        height,
        setHeight,
        saving,
        success,
        errorMessage,
        refreshHistory,
        updatingStatus,
        saveTrackingRecord,
        changeHarvestStatus,
    };
}
