// src/components/CrudView.jsx
import React, { useState, useEffect } from 'react';

const CrudView = ({ modelName, config }) => {
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {

        setData([
            { id: 1, nombre: 'Maíz', nombre_cientifico: 'Zea mays', temporada: 'Verano' }
        ]);
        setIsEditing(false);
    }, [modelName]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Guardando en ${modelName}:`, formData);
        setIsEditing(false);
        setFormData({});
    };

    const handleEdit = (item) => {
        setFormData(item);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este registro?')) {
            console.log(`Eliminando registro ${id} de ${modelName}`);
            setData(data.filter(item => item.id !== id));
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
                        {config.columns.filter(col => col !== 'id').map(col => (
                            <div className="form-group" key={col}>
                                <label className="field-label">{col.replace('_', ' ')}</label>
                                <input
                                    type="text"
                                    name={col}
                                    className="input-field"
                                    value={formData[col] || ''}
                                    onChange={handleInputChange}
                                    placeholder={`Ingresa ${col.replace('_', ' ')}`}
                                    required
                                />
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
                                    <th key={col}>{col.replace('_', ' ')}</th>
                                ))}
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((row) => (
                                <tr key={row.id}>
                                    {config.columns.map(col => (
                                        <td key={col}>{row[col]}</td>
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