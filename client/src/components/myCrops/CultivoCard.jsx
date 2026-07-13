import { Sprout, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { resolveMediaUrl } from '../../services/api';
import ConfirmationToast from '../common/ConfirmationToast';
import DataRow from './DataRow';

/**
 * Tarjeta de un cultivo guardado, con sus acciones:
 * iniciar seguimiento y eliminar.
 *
 * Nota: el botón "Información" (ficha del cultivo) se omite por ahora
 * porque la página InfoCultivo todavía no existe en este proyecto.
 */
export default function CultivoCard({
    cultivo,
    estaIniciando,
    yaIniciado,
    estaEliminando,
    onIniciar,
    onEliminar,
}) {
    const bloqueada =
        estaIniciando || yaIniciado || estaEliminando;

    function solicitarEliminacion() {
        toast.info(
            ({ closeToast }) => (
                <ConfirmationToast
                    closeToast={closeToast}
                    onConfirm={() => onEliminar(cultivo.id)}
                    message={`¿Eliminar ${cultivo.cultivo_nombre} de Mis cultivos? Esta acción no se puede deshacer.`}
                    confirmLabel="Eliminar"
                    cancelLabel="Cancelar"
                    confirmClassName="btn-toast-delete"
                />
            ),
            {
                position: 'top-center',
                autoClose: false,
                closeButton: false,
                closeOnClick: false,
                draggable: false,
                theme: 'dark',
            }
        );
    }

    return (
        <div
            className={`cultivo-card ${yaIniciado || estaEliminando
                    ? 'cultivo-card--desvanecida'
                    : ''
                }`}
        >
            <div className="cultivo-card-imagen">
                {cultivo.cultivo_imagen ? (
                    <img
                        src={resolveMediaUrl(
                            cultivo.cultivo_imagen
                        )}
                        alt={cultivo.cultivo_nombre}
                    />
                ) : (
                    <div className="cultivo-card-imagen-placeholder">
                        <Sprout
                            size={40}
                            color="rgba(111,200,68,0.4)"
                        />
                    </div>
                )}
            </div>

            <div className="cultivo-card-body">
                <h3>{cultivo.cultivo_nombre}</h3>

                <p className="cultivo-card-fecha">
                    Agregado: {cultivo.fecha_siembra}
                </p>

                <div className="cultivo-card-datos">
                    <DataRow
                        label="Cosecha estimada"
                        value={cultivo.fecha_cosecha_estimada}
                    />

                    <DataRow
                        label="Estado"
                        value={cultivo.estado_nombre}
                    />
                </div>

                <div className="cultivo-card-acciones">
                    <button
                        type="button"
                        className={`cultivo-btn cultivo-btn--iniciar ${yaIniciado
                                ? 'cultivo-btn--enviado'
                                : ''
                            }`}
                        onClick={() => onIniciar(cultivo.id)}
                        disabled={bloqueada}
                    >
                        <Sprout size={15} />

                        {estaIniciando
                            ? 'Iniciando...'
                            : yaIniciado
                                ? '✓ Enviado a Mis cosechas'
                                : 'Iniciar cultivo'}
                    </button>

                    <button
                        type="button"
                        className="cultivo-btn cultivo-btn--eliminar"
                        onClick={solicitarEliminacion}
                        disabled={bloqueada}
                    >
                        {estaEliminando ? (
                            'Eliminando...'
                        ) : (
                            <>
                                <Trash2 size={14} />
                                Eliminar cultivo
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}