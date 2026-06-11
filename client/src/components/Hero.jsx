import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.jpg';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <span className="badge-tag">🌱 Inteligencia Agronómica</span>
                <h1 className="hero-title">
                    Sistema Inteligente de Guía y Recomendación <span className="logo-text-green">Agroclimática</span>
                </h1>
                <p className="hero-description">
                    SIGRA optimiza la producción de cultivos de ciclo corto para autoconsumo. Mediante el análisis predictivo de variables climáticas y de suelo, te ofrece recomendaciones exactas y una guía de acompañamiento interactiva.
                </p>
                <div className="hero-actions">
                    <Link to="/" className="btn-primary" style={{ width: 'auto', marginTop: 0 }}>
                        Iniciar Mi Huerto
                    </Link>
                </div>
            </div>

            <div className="image-frame" style={{ animation: 'float 6s ease-in-out infinite' }}>
                <div className="image-placeholder" style={{ aspectRatio: '1/1' }}>
                    <img src={heroImage} alt="SIGRA Dashboard Preview" />
                </div>
            </div>
        </section>
    );
};

export default Hero;