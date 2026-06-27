const CrudTable = ({
    data,
    config,
    handleEdit,
    handleDelete
}) => {

    return (
        <div className="table-container">
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
    );
};

export default CrudTable;