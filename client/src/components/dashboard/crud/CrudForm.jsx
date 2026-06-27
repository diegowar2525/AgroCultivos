const CrudForm = ({
    config,
    formData,
    selectOptions,
    handleInputChange,
    handleSubmit,
    setIsEditing
}) => {

    return (
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
    );
};

export default CrudForm;