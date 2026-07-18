import {
    getRowLabel,
    renderCrudCell
} from './crudTableUtils';

const CrudTableBody = ({
    data,
    originalData,
    columns,
    title,
    handleEdit,
    handleDelete
}) => {
    if (data.length === 0) {
        return (
            <tbody>
                <tr>
                    <td
                        colSpan={columns.length + 1}
                        className="crud-table-empty"
                    >
                        {originalData.length === 0
                            ? `No hay registros en ${title}.`
                            : 'No hay registros que coincidan con los filtros.'}
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {data.map(row => {
                const rowLabel = getRowLabel(row);

                return (
                    <tr key={row.id}>
                        {columns.map(column => (
                            <td key={column.key}>
                                {renderCrudCell(row, column)}
                            </td>
                        ))}

                        <td>
                            <div className="action-buttons">
                                <button
                                    type="button"
                                    className="btn-icon edit"
                                    onClick={() => handleEdit(row)}
                                    aria-label={`Editar ${rowLabel}`}
                                >
                                    ✎
                                </button>

                                <button
                                    type="button"
                                    className="btn-icon delete"
                                    onClick={() =>
                                        handleDelete(row.id)
                                    }
                                    aria-label={`Eliminar ${rowLabel}`}
                                >
                                    🗑
                                </button>
                            </div>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};

export default CrudTableBody;