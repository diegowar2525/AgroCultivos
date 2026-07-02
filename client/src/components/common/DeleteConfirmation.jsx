const DeleteConfirmation = ({
    closeToast,
    onConfirm,
    message = '¿Estás seguro de eliminar este registro?',
    confirmLabel = 'Eliminar',
}) => (
    <div className="toast-confirm-container">
        <p className="toast-confirm-title">{message}</p>
        <div className="toast-confirm-actions">
            <button className="btn-toast-cancel" onClick={closeToast}>
                Cancelar
            </button>
            <button
                className="btn-toast-delete"
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

export default DeleteConfirmation;
