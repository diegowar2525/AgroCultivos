export const getImageUrl = image => {
    if (!image) {
        return null;
    }

    if (
        image.startsWith('http://') ||
        image.startsWith('https://') ||
        image.startsWith('blob:')
    ) {
        return image;
    }

    const apiUrl =
        import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

    const normalizedImage = image.startsWith('/')
        ? image
        : `/${image}`;

    return `${apiUrl}${normalizedImage}`;
};

export const getRowLabel = row => {
    return (
        row.nombre ||
        row.first_name ||
        row.username ||
        'registro'
    );
};

export const getSortValue = (
    row,
    nameKey,
    secondaryNameKey
) => {
    if (!nameKey) {
        return '';
    }

    const values = [row[nameKey]];

    if (secondaryNameKey) {
        values.push(row[secondaryNameKey]);
    }

    return values
        .filter(
            value =>
                value !== null &&
                value !== undefined &&
                value !== ''
        )
        .join(' ')
        .trim();
};

export const renderCrudCell = (row, column) => {
    const value = row[column.key];

    if (column.type === 'image') {
        const imageUrl = getImageUrl(value);

        return imageUrl ? (
            <img
                src={imageUrl}
                alt={`Imagen de ${getRowLabel(row)}`}
                className="crud-table-image"
                loading="lazy"
            />
        ) : (
            <span className="crud-table-empty-image">
                Sin imagen
            </span>
        );
    }

    if (typeof value === 'boolean') {
        return value ? 'Sí' : 'No';
    }

    if (
        value === null ||
        value === undefined ||
        value === ''
    ) {
        return '—';
    }

    return value;
};