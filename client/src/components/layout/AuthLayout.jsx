import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf } from 'lucide-react';

export default function AuthLayout({
    children,
    title,
    subtitle,
    maxWidth,
}) {
    return (
        <div className="auth-layout">
            <Link to="/" className="auth-back-link">
                <ArrowLeft size={14} /> Volver al inicio
            </Link>

            <div className="auth-container" style={maxWidth ? { maxWidth } : undefined}>
                <div className="auth-header">
                    <div className="auth-logo">
                        <Leaf size={26} strokeWidth={2.5} />
                    </div>

                    <h1 className="auth-title">{title}</h1>

                    <p className="auth-subtitle">{subtitle}</p>
                </div>

                {children}
            </div>
        </div>
    );
}