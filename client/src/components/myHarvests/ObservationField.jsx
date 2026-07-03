import { NotebookPen } from 'lucide-react';

export default function ObservationField({
    label,
    placeholder,
    value,
    rows,
    onChange,
    variant = 'good',
}) {
    return (
        <div className="my-harvests-form-group">
            <label className="my-harvests-form-label">
                <NotebookPen size={12} />
                {label}
            </label>

            <textarea
                placeholder={placeholder}
                value={value}
                onChange={event => onChange(event.target.value)}
                rows={rows}
                className={`my-harvests-form-control my-harvests-textarea my-harvests-textarea--${variant}`}
            />
        </div>
    );
}
