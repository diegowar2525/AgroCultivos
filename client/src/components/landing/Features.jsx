import { Brain, BookOpen, ShieldAlert } from 'lucide-react';

const featuresData = [
    {
        icon: Brain,
        colorClass: 'feature-icon--pink',
        title: 'Recomendación Predictiva',
        desc: 'Evaluación algorítmica de tipos de suelo, horas de luz y requerimientos de agua específicos para tu localidad en tiempo real.',
    },
    {
        icon: BookOpen,
        colorClass: 'feature-icon--blue',
        title: 'Guía de Seguimiento',
        desc: 'Una bitácora digital paso a paso estructurada según el ciclo biológico corto del cultivo para asegurar su germinación y cosecha.',
    },
    {
        icon: ShieldAlert,
        colorClass: 'feature-icon--green',
        title: 'Gestión de Amenazas',
        desc: 'Módulo de prevención frente a plagas, enfermedades estacionales y vulnerabilidades climáticas críticas en tu región.',
    },
];

const Features = () => {
    return (
        <section className="features-section">
            <div className="section-header">
                <h2 className="features-title">Características del Sistema</h2>
                <p className="features-subtitle">
                    Arquitectura modular de datos enfocada en la viabilidad agronómica urbana y familiar.
                </p>
            </div>

            <div className="features-grid">
                {featuresData.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div className="feature-card" key={index}>
                            <div className={`feature-icon ${feature.colorClass}`}>
                                <Icon size={28} />
                            </div>
                            <h3 className="feature-card-title">{feature.title}</h3>
                            <p className="feature-card-desc">{feature.desc}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Features;