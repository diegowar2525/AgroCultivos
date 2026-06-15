import React from 'react';

const featuresData = [
    {
        icon: '🧠',
        title: 'Recomendación Predictiva',
        desc: 'Evaluación algorítmica de tipos de suelo (pH), horas de luz y requerimientos de agua (mm) específicos para tu localidad.'
    },
    {
        icon: '📅',
        title: 'Guía de Seguimiento',
        desc: 'Una bitácora digital paso a paso estructurada según el ciclo biológico corto del cultivo para asegurar su germinación y cosecha.'
    },
    {
        icon: '🛡️',
        title: 'Gestión de Amenazas',
        desc: 'Módulo de prevención frente a plagas, enfermedades estacionales y vulnerabilidades climáticas críticas.'
    }
];

const Features = () => {
    return (
        <section className="features-section">
            <div className="section-header">
                <h2 className="card-title" style={{ fontSize: '2rem' }}>Características del Sistema</h2>
                <p className="card-subtitle">Arquitectura modular de datos enfocada en la viabilidad agronómica urbana y familiar.</p>
            </div>

            <div className="features-grid">
                {featuresData.map((feature, index) => (
                    <div className="glass-card feature-card" key={index} style={{ opacity: 1, animation: 'none' }}>
                        <span className="feature-icon">{feature.icon}</span>
                        <h3 className="card-title" style={{ marginBottom: '0.5rem', fontSize: '1.15rem' }}>{feature.title}</h3>
                        <p className="card-subtitle" style={{ margin: 0, lineHeight: '1.6' }}>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;