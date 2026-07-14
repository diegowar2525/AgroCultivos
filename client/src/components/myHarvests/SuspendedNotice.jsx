import { Ban } from 'lucide-react';

export default function SuspendedNotice() {
    return (
        <section className="my-harvests-expanded-card my-harvests-suspended-card">
            <p className="my-harvests-expanded-title my-harvests-suspended-title">
                <Ban size={14} />
                Cultivo suspendido
            </p>

            <p className="my-harvests-suspended-texto">
                Un administrador suspendió el seguimiento de este cultivo.
                No puedes registrar nueva altura, salud ni fotos hasta que
                se reactive.
            </p>
        </section>
    );
}