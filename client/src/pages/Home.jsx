import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import ProjectDetails from '../components/landing/ProjectDetails';
import Footer from '../components/landing/Footer';

export default function Home() {
    return (
        <div className="home-page">
            <Navbar />
            <Hero />
            <div className="section-divider section-divider--to-light" />
            <ProjectDetails />
            <div className="section-divider section-divider--to-dark" />
            <Features />
            <Footer />
        </div>
    );
}