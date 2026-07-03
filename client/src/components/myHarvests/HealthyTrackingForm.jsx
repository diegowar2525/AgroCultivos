import { Camera, CircleCheck, CloudUpload, Ruler } from 'lucide-react';

import HealthNotice from './HealthNotice';
import ObservationField from './ObservationField';

export default function HealthyTrackingForm({
    height,
    setHeight,
    photo,
    setPhoto,
    observation,
    setObservation,
    saving,
    success,
    onSave,
}) {
    return (
        <div className="my-harvests-form-stack">
            <HealthNotice type="bien" />

            <div className="my-harvests-form-group">
                <label className="my-harvests-form-label">
                    <Ruler size={12} />
                    Altura actual de la planta
                </label>

                <div className="my-harvests-input-row">
                    <input
                        type="number"
                        min="0"
                        placeholder="Ej: 24"
                        value={height}
                        onChange={event => setHeight(event.target.value)}
                        className="my-harvests-form-control"
                    />
                    <span className="my-harvests-unit">cm</span>
                </div>
            </div>

            <div className="my-harvests-form-group">
                <label className="my-harvests-form-label">
                    <Camera size={12} />
                    Foto del cultivo
                </label>

                <label className="my-harvests-upload-box">
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={event => setPhoto(event.target.files[0])}
                        className="my-harvests-upload-input"
                    />

                    {photo ? (
                        <span className="my-harvests-upload-file">
                            <CircleCheck size={14} />
                            {photo.name}
                        </span>
                    ) : (
                        <>
                            <CloudUpload size={22} />
                            <span>Toca para tomar foto o elegir de galería</span>
                        </>
                    )}
                </label>
            </div>

            <ObservationField
                label="Observación (opcional)"
                placeholder="Ej: hojas verdes, buen crecimiento..."
                value={observation}
                rows={2}
                onChange={setObservation}
            />

            <button
                type="button"
                onClick={onSave}
                disabled={saving}
                className={`my-harvests-save-button my-harvests-save-button--good ${success ? 'is-success' : ''}`}
            >
                {saving ? 'Guardando...' : success ? '✓ Registro guardado' : 'Guardar registro'}
            </button>
        </div>
    );
}
