import { Sprout } from 'lucide-react';

export default function MyHarvestsEmptyState({ onGoToMyCrops }) {
    return (
        <section className="my-harvests-empty">
            <div className="my-harvests-empty__icon">
                <Sprout size={36} />
            </div>

            <div>
                <h3>No tienes cosechas activas</h3>
                <p>
                    Ve a <strong>Mis cultivos</strong> y presiona "Iniciar cultivo" para comenzar.
                </p>
            </div>

            <button
                type="button"
                className="my-harvests-empty__button"
                onClick={onGoToMyCrops}
            >
                Ir a Mis cultivos
            </button>
        </section>
    );
}
