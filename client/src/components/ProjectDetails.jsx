import React from 'react';
import shortCycleCrops from '../assets/short-cycle-crops.jpg';

const ProjectDetails = () => {
    return (
        <section className="details-section">
            <div className="image-frame">
                <div className="image-placeholder" style={{ aspectRatio: '1/1' }}>
                    <img src={shortCycleCrops} alt="SIGRA Dashboard Preview" />
                </div>
            </div>

            <div>
                <span className="field-label" style={{ color: 'var(--green-hover)' }}>Soberanía Alimentaria</span>
                <h2 className="card-title" style={{ fontSize: '2rem', marginTop: '0.5rem' }}>
                    Diseñado para el Éxito de Cultivos de Ciclo Corto
                </h2>
                <p className="card-subtitle" style={{ marginTop: '1rem', lineHeight: '1.6' }}>
                    Los cultivos de ciclo corto (como hortalizas, legumbres y tubérculos menores) son la solución ideal para el autoconsumo debido a su rápida cosecha. SIGRA minimiza la tasa de fracaso de estas siembras domésticas mediante:
                </p>
                <ul className="details-list">
                    <li>Sugerencia precisa según las fases agroclimáticas óptimas de la zona.</li>
                    <li>Control granular de los requerimientos de agua, luz y nivel nutricional.</li>
                    <li>Mitigación activa de plagas mediante categorización de tipos de amenazas.</li>
                    <li>Planificación limpia del terreno según las propiedades del Tipo de Suelo.</li>
                </ul>
            </div>
        </section>
    );
};

export default ProjectDetails;