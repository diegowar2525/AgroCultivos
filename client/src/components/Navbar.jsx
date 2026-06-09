import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../assets/css/navbar.css';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">

                {/* Logo SIGRA */}
                <div className="navbar-logo">
                    <div className="logo-icon">
                        🌱
                    </div>
                    <span className="logo-text">
                        SI
                        <span className="logo-text-green">
                            GRA
                        </span>
                    </span>
                </div>

                {/* Links de Navegación */}
                <div className="navbar-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'nav-item active' : 'nav-item'
                        }
                    >
                        Inicio
                    </NavLink>

                    <NavLink
                        to="/AdminDashboard"
                        className={({ isActive }) =>
                            isActive ? 'nav-item active' : 'nav-item'
                        }
                    >
                        Panel de Administración
                    </NavLink>

                </div>

                {/* Sección derecha de usuario */}
                <div className="navbar-user-section">

                    {/* Se cambió de <div> a <NavLink> */}
                    <NavLink
                        to="/Perfil"
                        className={({ isActive }) =>
                            isActive ? 'user-badge active' : 'user-badge'
                        }
                    >
                        <div className="user-avatar">
                            {user?.first_name?.charAt(0)}
                        </div>
                        <span className="user-name">
                            {user?.first_name}
                        </span>
                    </NavLink>

                    <button
                        className="btn-logout"
                        onClick={logout}
                    >
                        Salir
                    </button>
                </div>

            </div>
        </nav>
    );
}