export default function ProblemChips({ items, selectedItem, onSelect, variant = 'warning' }) {
    return (
        <div className="my-harvests-chip-list">
            {items.map(item => (
                <button
                    key={item.nombre}
                    type="button"
                    onClick={() => onSelect(selectedItem?.nombre === item.nombre ? null : item)}
                    className={`my-harvests-chip my-harvests-chip--${variant} ${selectedItem?.nombre === item.nombre ? 'is-active' : ''}`}
                >
                    {item.nombre}
                </button>
            ))}
        </div>
    );
}
