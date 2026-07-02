import { Sprout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/** Estado vacío cuando el usuario todavía no tiene cultivos guardados. */
export default function EstadoVacio() {
    const navigate = useNavigate();

    return (
        <div className="mis-cultivos-empty">
            <Sprout size={48} color="rgba(111,200,68,0.3)" />
            <p>No tienes cultivos guardados aún.</p>
            <button className="mis-cultivos-empty-btn" onClick={() => navigate('/recommendations')}>
                Ver recomendaciones
            </button>
        </div>
    );
}
