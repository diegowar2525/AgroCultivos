import { useMemo, useState } from 'react';

import CrudTableFilters from './CrudTableFilters';
import CrudTableBody from './CrudTableBody';

import { getSortValue } from './crudTableUtils';

const CrudTable = ({
    data = [],
    config,
    handleEdit,
    handleDelete
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] =
        useState('todos');
    const [nameOrder, setNameOrder] =
        useState('sin-orden');

    const columns = config?.columns ?? [];

    const activeKey =
        config?.filterConfig?.activeKey;

    const nameKey =
        config?.filterConfig?.nameKey;

    const secondaryNameKey =
        config?.filterConfig?.secondaryNameKey;

    const hasActiveColumn = Boolean(
        activeKey &&
        columns.some(
            column => column.key === activeKey
        )
    );

    const hasNameColumn = Boolean(
        nameKey &&
        columns.some(
            column => column.key === nameKey
        )
    );

    const filteredData = useMemo(() => {
        const normalizedSearch = searchTerm
            .trim()
            .toLocaleLowerCase('es');

        const filteredRows = data.filter(row => {
            const matchesSearch =
                !normalizedSearch ||
                columns.some(column => {
                    if (column.type === 'image') {
                        return false;
                    }

                    const value = row[column.key];

                    if (
                        value === null ||
                        value === undefined
                    ) {
                        return false;
                    }

                    const searchableValue =
                        typeof value === 'boolean'
                            ? value
                                ? 'sí si activo administrador'
                                : 'no inactivo usuario'
                            : String(value)
                                .toLocaleLowerCase('es');

                    return searchableValue.includes(
                        normalizedSearch
                    );
                });

            const matchesActive =
                !hasActiveColumn ||
                activeFilter === 'todos' ||
                (
                    activeFilter === 'activos' &&
                    row[activeKey] === true
                ) ||
                (
                    activeFilter === 'inactivos' &&
                    row[activeKey] === false
                );

            return matchesSearch && matchesActive;
        });

        if (
            !hasNameColumn ||
            nameOrder === 'sin-orden'
        ) {
            return filteredRows;
        }

        return [...filteredRows].sort(
            (firstRow, secondRow) => {
                const firstName = getSortValue(
                    firstRow,
                    nameKey,
                    secondaryNameKey
                );

                const secondName = getSortValue(
                    secondRow,
                    nameKey,
                    secondaryNameKey
                );

                const comparison =
                    firstName.localeCompare(
                        secondName,
                        'es',
                        {
                            sensitivity: 'base',
                            numeric: true,
                            ignorePunctuation: true
                        }
                    );

                return nameOrder === 'asc'
                    ? comparison
                    : -comparison;
            }
        );
    }, [
        data,
        columns,
        searchTerm,
        activeFilter,
        nameOrder,
        activeKey,
        nameKey,
        secondaryNameKey,
        hasActiveColumn,
        hasNameColumn
    ]);

    const clearFilters = () => {
        setSearchTerm('');
        setActiveFilter('todos');
        setNameOrder('sin-orden');
    };

    const hasAppliedFilters =
        searchTerm.trim() !== '' ||
        activeFilter !== 'todos' ||
        nameOrder !== 'sin-orden';

    if (!config || columns.length === 0) {
        return (
            <div className="crud-table-empty">
                No se pudo cargar la configuración de la tabla.
            </div>
        );
    }

    return (
        <div className="crud-table-section">
            <CrudTableFilters
                title={config.title}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                nameOrder={nameOrder}
                setNameOrder={setNameOrder}
                hasActiveColumn={hasActiveColumn}
                hasNameColumn={hasNameColumn}
                hasAppliedFilters={hasAppliedFilters}
                clearFilters={clearFilters}
                resultCount={filteredData.length}
            />

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th key={column.key}>
                                    {column.label}
                                </th>
                            ))}

                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <CrudTableBody
                        data={filteredData}
                        originalData={data}
                        columns={columns}
                        title={config.title}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </table>
            </div>
        </div>
    );
};

export default CrudTable;