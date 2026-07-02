import { CheckCircle2 } from 'lucide-react';
import shortCycleCrops from '@/assets/short-cycle-crops.jpg';

const beneficios = [
    'Sugerencia precisa según las fases agroclimáticas óptimas de la zona.',
    'Control granular de los requerimientos de agua, luz y nivel nutricional.',
    'Mitigación activa de plagas mediante categorización de tipos de amenazas.',
    'Planificación limpia del terreno según las propiedades del Tipo de Suelo.',
];

const ProjectDetails = () => {
    return (
        <section className="details-section">
            <div className="details-inner">
                <div className="details-image-frame">
                    <img src={shortCycleCrops} alt="Cultivos de ciclo corto" />
                </div>

                <div className="details-text">
                    <span className="details-eyebrow">Soberanía Alimentaria</span>
                    <h2 className="details-title">
                        Diseñado para el Éxito de Cultivos de Ciclo Corto
                    </h2>
                    <p className="details-description">
                        Los cultivos de ciclo corto son la solución ideal para el autoconsumo debido
                        a su rápida cosecha. SIGRA minimiza la tasa de fracaso de estas siembras
                        domésticas mediante:
                    </p>
                    <ul className="details-list">
                        {beneficios.map((item, i) => (
                            <li key={i}>
                                <CheckCircle2 size={18} className="details-list-icon" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetails;