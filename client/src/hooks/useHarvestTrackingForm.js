import { useState } from 'react';
import {
    createTrackingRecord,
    predictThreatFromTrackingImage,
    updateHarvestStatus,
} from '../services/harvestsService';

const DIAGNOSTIC_MARKER = '--- Diagnóstico automático por imagen ---';

function getFenologicalStatus(healthStatus, threatType, commonProblem) {
    if (healthStatus === 'bien') return 'Crecimiento';

    if (healthStatus === 'observacion') {
        return commonProblem ? `Observación: ${commonProblem.nombre}` : 'En observación';
    }

    if (healthStatus === 'amenaza') {
        return `Amenaza: ${threatType?.nombre || 'detectada por imagen'}`;
    }

    return 'Seguimiento';
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

function mergeObservationWithDiagnostic(currentObservation, diagnosticText) {
    if (!diagnosticText) return currentObservation;

    const cleanObservation = currentObservation.includes(DIAGNOSTIC_MARKER)
        ? currentObservation.split(DIAGNOSTIC_MARKER)[0].trim()
        : currentObservation.trim();

    if (!cleanObservation) return diagnosticText;

    return `${cleanObservation}\n\n${diagnosticText}`;
}

export default function useHarvestTrackingForm(cultivo, onCultivoActualizado) {
    const [healthStatus, setHealthStatus] = useState('bien');

    const [threatType, setThreatType] = useState(null);

    const [commonProblem, setCommonProblem] = useState(null);
    const [observation, setObservation] = useState('');
    const [photo, setPhotoState] = useState(null);
    const [height, setHeight] = useState('');
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [refreshHistory, setRefreshHistory] = useState(0);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const [detectingThreat, setDetectingThreat] = useState(false);
    const [detectionResult, setDetectionResult] = useState(null);
    const [detectionError, setDetectionError] = useState('');

    function setPhoto(file) {
        setPhotoState(file);
        setDetectionResult(null);
        setDetectionError('');
    }

    function clearForm() {
        setThreatType(null);
        setCommonProblem(null);
        setObservation('');
        setPhotoState(null);
        setHeight('');
        setErrorMessage('');
        setSuccess(false);
        setDetectionResult(null);
        setDetectionError('');
    }

    function changeHealthStatus(nextStatus) {
        setHealthStatus(nextStatus);
        clearForm();
    }

    async function analyzeThreatFromPhoto() {
        if (!photo) {
            setDetectionError('Primero debes subir una imagen.');
            return;
        }

        setDetectingThreat(true);
        setDetectionError('');
        setErrorMessage('');

        try {
            const data = await predictThreatFromTrackingImage({
                cultivoUsuarioId: cultivo.id,
                foto: photo,
            });

            setDetectionResult(data);

            const prediction = data.prediccion;
            const diagnosticText = data.mensaje_observacion;

            if (prediction?.estado === 'Sano') {
                setHealthStatus('bien');
                setThreatType(null);
                setCommonProblem(null);
            } else {
                setHealthStatus('amenaza');
                setCommonProblem(null);
                setThreatType({
                    nombre: prediction?.amenaza || 'Amenaza detectada',
                    pasos: [
                        'Revisar visualmente otras hojas de la planta.',
                        'Comparar la imagen con síntomas reales del cultivo.',
                        'Registrar un nuevo seguimiento en los próximos días.',
                    ],
                });
            }

            setObservation(current =>
                mergeObservationWithDiagnostic(current, diagnosticText)
            );
        } catch (error) {
            setDetectionError(parseApiError(error));
        } finally {
            setDetectingThreat(false);
        }
    }

    async function saveTrackingRecord() {
        setSaving(true);
        setErrorMessage('');

        try {
            await createTrackingRecord({
                cultivoUsuarioId: cultivo.id,
                altura: height,
                estadoFenologico: getFenologicalStatus(healthStatus, threatType, commonProblem),
                observaciones: observation,
                foto: photo,
            });

            setSuccess(true);
            setRefreshHistory(value => value + 1);

            setTimeout(() => {
                setSuccess(false);
                setObservation('');
                setHeight('');
                setPhotoState(null);
                setDetectionResult(null);
                setDetectionError('');
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
        threatType,
        setThreatType,
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
        detectingThreat,
        detectionResult,
        detectionError,
        analyzeThreatFromPhoto,
        saveTrackingRecord,
        changeHarvestStatus,
    };
}