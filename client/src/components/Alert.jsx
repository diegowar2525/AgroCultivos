const DeleteConfirmation = ({ closeToast, onConfirm }) => (
    <div className="toast-confirm-container">
        <p className="toast-confirm-title">¿Estás seguro de eliminar este registro?</p>
        <div className="toast-confirm-actions">
            <button className="btn-logout btn-toast-cancel" onClick={closeToast}>
                Cancelar
            </button>
            <button
                className="btn-primary btn-toast-delete"
                onClick={() => {
                    closeToast();
                    onConfirm();
                }}
            >
                Eliminar
            </button>
        </div>
    </div>
);

export default DeleteConfirmation;