import { useCrud } from '@/hooks/useCrud';
import { toast } from 'react-toastify';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';

import DeleteConfirmation from '@/components/common/DeleteConfirmation';

const CrudView = ({ modelName, config }) => {

    const {
        data,
        isEditing,
        formData,
        selectOptions,
        setFormData,
        setIsEditing,
        handleInputChange,
        handleFileChange,
        handleSubmit,
        handleEdit,
        executeDelete
    } = useCrud(modelName, config);

    const handleDelete = (id) => {
        toast.info(
            ({ closeToast }) => (
                <DeleteConfirmation
                    closeToast={closeToast}
                    onConfirm={() => executeDelete(id)}
                />
            ),
            {
                position: 'top-center',
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                theme: 'dark'
            }
        );
    };

    return (
        <div
            className="glass-card"
            style={{
                animation: 'none',
                opacity: 1
            }}
        >
            <div
                className="content-header"
                style={{ marginBottom: '1.5rem' }}
            >
                <div>
                    <h2 className="card-title">
                        Gestión de {config.title}
                    </h2>

                    <p className="card-subtitle">
                        Administra los registros de la base de datos.
                    </p>
                </div>

                {!isEditing && (
                    <button
                        className="btn-primary"
                        style={{
                            width: 'auto',
                            marginTop: 0
                        }}
                        onClick={() => {
                            setFormData({});
                            setIsEditing(true);
                        }}
                    >
                        + Nuevo Registro
                    </button>
                )}
            </div>

            {isEditing ? (
                <CrudForm
                    config={config}
                    formData={formData}
                    selectOptions={selectOptions}
                    handleInputChange={handleInputChange}
                    handleFileChange={handleFileChange}
                    handleSubmit={handleSubmit}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <CrudTable
                    data={data}
                    config={config}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default CrudView;
