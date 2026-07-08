import { Ruler } from 'lucide-react';

export default function PlantHeightField({
    height,
    setHeight,
}) {
    return (
        <div className="my-harvests-form-group">
            <label className="my-harvests-form-label">
                <Ruler size={12} />
                Altura actual de la planta
            </label>

            <div className="my-harvests-input-row">
                <input
                    type="number"
                    min="0"
                    placeholder="Ej: 24"
                    value={height}
                    onChange={event => setHeight(event.target.value)}
                    className="my-harvests-form-control"
                />

                <span className="my-harvests-unit">cm</span>
            </div>
        </div>
    );
}