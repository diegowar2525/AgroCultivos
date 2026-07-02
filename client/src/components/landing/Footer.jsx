import { Leaf } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="site-footer-logo">
                <div className="site-footer-logo-icon">
                    <Leaf size={15} strokeWidth={2.5} />
                </div>
                <span className="site-footer-logo-text">SIGRA</span>
            </div>
            <p className="site-footer-text">
                &copy; {new Date().getFullYear()} SIGRA — Sistema Inteligente de Recomendación y Guía Agroclimática.
            </p>
        </footer>
    );
};

export default Footer;