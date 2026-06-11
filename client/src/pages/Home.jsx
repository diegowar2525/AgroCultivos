import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProjectDetails from '../components/ProjectDetails';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div className="app-container landing-wrapper">
            {/* Blobs de luz decorativa reutilizando tus estilos de auth.css */}
            <div className="auth-blob blob-top" style={{ left: '-5%', top: '10%', opacity: 0.7 }}></div>
            <div className="auth-blob blob-bottom" style={{ right: '-5%', top: '50%', opacity: 0.6 }}></div>

            {/* Barra de navegación superior con logo SIGRA */}
            <Navbar />

            {/* Bloques de la Landing Page */}
            <Hero />

            <Features />

            <ProjectDetails />

            <Footer />
        </div>
    );
}