import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import heroImage from '@/assets/hero.jpg';

const Hero = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <section className="hero-section">
            <div className="hero-inner">
                <div className="hero-text">
                    <span className="badge-tag">
                        <span className="badge-dot" />
                        Inteligencia Agronómica
                    </span>

                    <h1 className="hero-title">
                        Sistema Inteligente de Guía y Recomendación{' '}
                        <span className="hero-title-highlight">Agroclimática</span>
                    </h1>

                    <p className="hero-description">
                        SIGRA optimiza la producción de cultivos de ciclo corto para autoconsumo.
                        Mediante el análisis predictivo de variables climáticas y de suelo, te ofrece
                        recomendaciones exactas y una guía de acompañamiento interactiva.
                    </p>

                    <div className="hero-actions">
                        <button
                            className="btn-hero"
                            onClick={() => navigate(user ? '/recommendations' : '/login')}
                        >
                            Iniciar mi huerto
                        </button>
                    </div>
                </div>

                <div className="hero-image-wrap">
                    <div className="hero-image-frame">
                        <img src={heroImage} alt="SIGRA Dashboard Preview" />
                    </div>
                    <div className="hero-glow" />
                </div>
            </div>
        </section>
    );
};

export default Hero;