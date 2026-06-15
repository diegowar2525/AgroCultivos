import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import DeleteConfirmation from './Alert';


const CrudView = ({ modelName, config }) => {
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectOptions, setSelectOptions] = useState({});


    const cargarSelects = async () => {
        try {

            const camposSelect =
                config.fields?.filter(
                    field => field.type === 'select'
                ) || [];

            const opciones = {};

            for (const campo of camposSelect) {

                const response = await api.get(
                    campo.endpoint
                );

                opciones[campo.name] =
                    response.data;
            }

            setSelectOptions(opciones);

        } catch (error) {
            console.error(error);
        }
    };

    const cargarDatos = async () => {
        try {
            const response = await api.get(
                config.endpoint
            );

            setData(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        cargarDatos();
        cargarSelects();

        setIsEditing(false);
        setFormData({});

    }, [modelName]);

    const handleInputChange = (e) => {

        const { name, value, type, checked } =
            e.target;

        setFormData({
            ...formData,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (formData.id) {

                await api.put(
                    `${config.endpoint}${formData.id}/`,
                    formData
                );

            } else {

                await api.post(
                    config.endpoint,
                    formData
                );

            }

            await cargarDatos();

            setFormData({});
            setIsEditing(false);

        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (item) => {
        setFormData(item);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        toast.info(
            ({ closeToast }) => (
                <DeleteConfirmation
                    closeToast={closeToast}
                    onConfirm={() => executeDelete(id)}
                />
            ),
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                theme: "dark"
            }
        );
    };

    const executeDelete = async (id) => {
        try {
            await api.delete(`${config.endpoint}${id}/`);

            toast.success('Registro eliminado correctamente', { autoClose: 3000, theme: 'dark' });

            await cargarDatos();
        } catch (error) {
            console.error(error);
            toast.error('Hubo un error al eliminar el registro.', { theme: 'dark' });
        }
    };

    return (
        <div className="glass-card" style={{ animation: 'none', opacity: 1 }}>
            <div className="content-header" style={{ marginBottom: '1.5rem' }}>
                <div>
                    <h2 className="card-title">Gestión de {config.title}</h2>
                    <p className="card-subtitle">Administra los registros de la base de datos.</p>
                </div>
                {!isEditing && (
                    <button
                        className="btn-primary"
                        style={{ width: 'auto', marginTop: 0 }}
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
                <form onSubmit={handleSubmit} style={{ animation: 'fadeIn 0.3s ease' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {config.fields?.map(field => (

                            <div
                                className="form-group"
                                key={field.name}
                            >

                                {field.type !== 'checkbox' && (
                                    <label className="field-label">
                                        {field.label}
                                    </label>
                                )}

                                {field.type === 'textarea' ? (

                                    <textarea
                                        name={field.name}
                                        className="input-field"
                                        value={formData[field.name] || ''}
                                        onChange={handleInputChange}
                                    />

                                ) : field.type === 'select' ? (

                                    <select
                                        name={field.name}
                                        className="input-field"
                                        value={formData[field.name] || ''}
                                        onChange={handleInputChange}
                                    >

                                        <option value="">
                                            Seleccione
                                        </option>

                                        {selectOptions[field.name]?.map(
                                            option => (
                                                <option
                                                    key={option.id}
                                                    value={option.id}
                                                >
                                                    {option.nombre}
                                                </option>
                                            )
                                        )}

                                    </select>

                                ) : field.type === 'checkbox' ? (

                                    <label
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            marginTop: '0.5rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            checked={
                                                Boolean(formData[field.name])
                                            }
                                            onChange={handleInputChange}
                                        />

                                        {field.label}
                                    </label>

                                ) : (

                                    <input
                                        type={field.type}
                                        name={field.name}
                                        className="input-field"
                                        value={formData[field.name] || ''}
                                        onChange={handleInputChange}
                                    />

                                )}

                            </div>

                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <button type="submit" className="btn-primary" style={{ width: 'auto' }}>
                            Guardar Cambios
                        </button>
                        <button
                            type="button"
                            className="btn-logout"
                            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                            onClick={() => setIsEditing(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            ) : (
                <div className="table-container" style={{ animation: 'fadeIn 0.3s ease' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                {config.columns.map(col => (
                                    <th key={col.key}>
                                        {col.label}
                                    </th>
                                ))}
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((row) => (
                                <tr key={row.id}>
                                    {config.columns.map(col => (
                                        <td key={col.key}>
                                            {typeof row[col.key] === 'boolean'
                                                ? row[col.key]
                                                    ? 'Sí'
                                                    : 'No'
                                                : row[col.key]}
                                        </td>
                                    ))}
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-icon edit" onClick={() => handleEdit(row)}>
                                                ✎
                                            </button>
                                            <button className="btn-icon delete" onClick={() => handleDelete(row.id)}>
                                                🗑
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={config.columns.length + 1} style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.4)' }}>
                                        No hay registros en {config.title}.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CrudView;