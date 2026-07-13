const ConfirmationToast = ({
    closeToast,
    onConfirm,
    message = '¿Estás seguro de realizar esta acción?',
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    confirmClassName = 'btn-toast-confirm',
}) => (
    <div className="toast-confirm-container">
        <p className="toast-confirm-title">{message}</p>

        <div className="toast-confirm-actions">
            <button
                type="button"
                className="btn-toast-cancel"
                onClick={closeToast}
            >
                {cancelLabel}
            </button>

            <button
                type="button"
                className={confirmClassName}
                onClick={() => {
                    closeToast();
                    onConfirm();
                }}
            >
                {confirmLabel}
            </button>
        </div>
    </div>
);

export default ConfirmationToast;