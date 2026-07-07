const CrudForm = ({
    config,
    formData,
    selectOptions,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    setIsEditing
}) => {

    return (
        <form onSubmit={handleSubmit} className="crud-form">
            <div className="crud-form-grid">
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

                            <label className="crud-checkbox-label">
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

                        ) : field.type === 'file' ? (

                            <div className="crud-file-field">
                                {typeof formData[field.name] === 'string' && formData[field.name] && (
                                    <img
                                        src={formData[field.name]}
                                        alt=""
                                        className="crud-file-preview"
                                    />
                                )}

                                <input
                                    type="file"
                                    name={field.name}
                                    accept="image/*"
                                    className="input-field"
                                    onChange={handleFileChange}
                                />

                                {formData[field.name] instanceof File && (
                                    <span className="crud-file-selected">
                                        Nuevo archivo: {formData[field.name].name}
                                    </span>
                                )}
                            </div>

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
            <div className="crud-form-actions">
                <button type="submit" className="btn-primary crud-form-submit">
                    Guardar Cambios
                </button>
                <button
                    type="button"
                    className="btn-logout crud-form-cancel"
                    onClick={() => setIsEditing(false)}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default CrudForm;