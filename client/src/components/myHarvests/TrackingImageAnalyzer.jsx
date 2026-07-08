import { Bot, Camera, CircleCheck, CloudUpload, Info, Loader2, Sparkles } from 'lucide-react';

export default function TrackingImageAnalyzer({
    photo,
    setPhoto,
    detectingThreat,
    detectionResult,
    detectionError,
    onAnalyze,
}) {
    const prediction = detectionResult?.prediccion;
    const cropMatch = detectionResult?.cultivo_usuario?.cultivo_coincide;

    return (
        <div className="my-harvests-form-group">
            <label className="my-harvests-form-label">
                <Camera size={12} />
                Foto del cultivo
            </label>

            <div className="my-harvests-model-notice">
                <Info size={14} />

                <p>
                    <strong>Dato importante:</strong> el modelo de autodetección solo puede analizar enfermedades en cultivos de
                    <span> Maíz, Pimiento, Papa y Tomate.</span>
                </p>
            </div>

            <label className="my-harvests-upload-box">
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={event => setPhoto(event.target.files[0] || null)}
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

            {photo && (
                <button
                    type="button"
                    onClick={onAnalyze}
                    disabled={detectingThreat}
                    className="my-harvests-save-button my-harvests-save-button--neutral"
                >
                    {detectingThreat ? (
                        <>
                            <Loader2 size={14} />
                            Analizando imagen...
                        </>
                    ) : (
                        <>
                            <Bot size={14} />
                            Autodetectar estado
                        </>
                    )}
                </button>
            )}

            {detectionError && (
                <div className="my-harvests-form-alert">
                    ⚠ {detectionError}
                </div>
            )}

            {prediction && (
                <div className={`my-harvests-diagnosis-card ${getDiagnosisClass(prediction.estado)}`}>
                    <div className="my-harvests-diagnosis-card__title">
                        <Sparkles size={14} />
                        <strong>Diagnóstico automático</strong>
                    </div>

                    <p>
                        <strong>Cultivo:</strong> {prediction.cultivo || 'No definido'}
                    </p>
                    <p>
                        <strong>Resultado:</strong> {prediction.amenaza || 'No definida'}
                    </p>
                    <p>
                        <strong>Estado:</strong> {prediction.estado || 'No definido'}
                    </p>
                    <p>
                        <strong>Confianza:</strong> {prediction.confianza}%
                    </p>

                    {cropMatch === false && (
                        <p>
                            ⚠ La imagen parece corresponder a otro cultivo diferente al seleccionado.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

function getDiagnosisClass(status = '') {
    const normalizedStatus = status.toLowerCase();

    if (
        normalizedStatus.includes('bien') ||
        normalizedStatus.includes('sano') ||
        normalizedStatus.includes('saludable')
    ) {
        return 'my-harvests-diagnosis-card--good';
    }

    return 'my-harvests-diagnosis-card--danger';
}