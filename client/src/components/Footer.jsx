import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="navbar-logo">
                    <div className="logo-icon" style={{ width: '1.5rem', height: '1.5rem', fontSize: '0.85rem' }}>🌱</div>
                    <span className="logo-text" style={{ fontSize: '1rem', letterSpacing: '0.02em' }}>SI<span className="logo-text-green">GRA</span></span>
                </div>
                <p className="footer-text">
                    &copy; {new Date().getFullYear()} SIGRA — Sistema Inteligente de Recomendación y Guía Agroclimática.
                </p>
            </div>
        </footer>
    );
};

export default Footer;