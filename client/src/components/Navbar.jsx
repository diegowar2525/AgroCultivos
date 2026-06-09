import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/navbar.css';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const nombre = localStorage.getItem('nombre') || 'Usuario';

    function cerrarSesion() {
        localStorage.removeItem('token');
        localStorage.removeItem('nombre');
        navigate('/login');
    }

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-container">

                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon">
                        <span>🌱</span>
                    </div>
                    <span className="logo-text">
                        Agro<span className="logo-text-green">Cultivos</span>
                    </span>
                </Link>

                {/* Links centrales */}
                <div className="navbar-links">
                    <Link
                        to="/"
                        className={`nav-item ${isActive('/') ? 'active' : ''}`}
                    >
                        🌾 Recomendaciones
                    </Link>
                    <Link
                        to="/historial"
                        className={`nav-item ${isActive('/historial') ? 'active' : ''}`}
                    >
                        📋 Mi Historial
                    </Link>
                </div>

                {/* Sección de Usuario */}
                <div className="navbar-user-section">
                    <div className="user-badge">
                        <div className="user-avatar">
                            {nombre.charAt(0).toUpperCase()}
                        </div>
                        <span className="user-name">{nombre}</span>
                    </div>

                    <button onClick={cerrarSesion} className="btn-logout">
                        Salir
                    </button>
                </div>

            </div>
        </nav>
    );
}