import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import ProjectDetails from '../components/Landing/ProjectDetails';
import Footer from '../components/Landing/Footer';

export default function Home() {
    return (
        <div className="app-container landing-wrapper">
            <div className="auth-blob blob-top" style={{ left: '-5%', top: '10%', opacity: 0.7 }}></div>
            <div className="auth-blob blob-bottom" style={{ right: '-5%', top: '50%', opacity: 0.6 }}></div>

            <Navbar />

            <Hero />

            <Features />

            <ProjectDetails />

            <Footer />
        </div>
    );
}