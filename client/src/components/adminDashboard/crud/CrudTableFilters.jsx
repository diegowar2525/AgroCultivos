const CrudTableFilters = ({
    title,
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    nameOrder,
    setNameOrder,
    hasActiveColumn,
    hasNameColumn,
    hasAppliedFilters,
    clearFilters,
    resultCount
}) => {
    return (
        <div className="crud-table-filters">
            <div className="crud-search-wrapper">
                <span
                    className="crud-search-icon"
                    aria-hidden="true"
                >
                    🔎
                </span>

                <input
                    type="search"
                    value={searchTerm}
                    onChange={event =>
                        setSearchTerm(event.target.value)
                    }
                    placeholder={`Buscar en ${title.toLowerCase()}...`}
                    className="crud-search-input"
                    aria-label={`Buscar en ${title}`}
                />
            </div>

            {hasActiveColumn && (
                <select
                    value={activeFilter}
                    onChange={event =>
                        setActiveFilter(event.target.value)
                    }
                    className="crud-filter-select"
                    aria-label="Filtrar por estado"
                >
                    <option value="todos">
                        Todos los estados
                    </option>

                    <option value="activos">
                        Activos
                    </option>

                    <option value="inactivos">
                        Inactivos
                    </option>
                </select>
            )}

            {hasNameColumn && (
                <select
                    value={nameOrder}
                    onChange={event =>
                        setNameOrder(event.target.value)
                    }
                    className="crud-filter-select"
                    aria-label="Ordenar alfabéticamente"
                >
                    <option value="sin-orden">
                        Orden original
                    </option>

                    <option value="asc">
                        Nombre: A-Z
                    </option>

                    <option value="desc">
                        Nombre: Z-A
                    </option>
                </select>
            )}

            {hasAppliedFilters && (
                <button
                    type="button"
                    className="crud-clear-filters"
                    onClick={clearFilters}
                >
                    Limpiar filtros
                </button>
            )}

            <span className="crud-results-count">
                {resultCount}{' '}
                {resultCount === 1
                    ? 'resultado'
                    : 'resultados'}
            </span>
        </div>
    );
};

export default CrudTableFilters;