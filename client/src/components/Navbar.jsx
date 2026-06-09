import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../assets/css/navbar.css';

export default function Navbar() {

    const {
        user,
        logout
    } = useAuth();

    return (
        <nav className="navbar">

            <div className="navbar-container">

                <div className="navbar-logo">

                    <div className="logo-icon">
                        🌱
                    </div>

                    <span className="logo-text">
                        Agro
                        <span className="logo-text-green">
                            Cultivos
                        </span>
                    </span>

                </div>

                <div className="navbar-links">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? 'nav-item active'
                                : 'nav-item'
                        }
                    >
                        Inicio
                    </NavLink>

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            isActive
                                ? 'nav-item active'
                                : 'nav-item'
                        }
                    >
                        Perfil
                    </NavLink>

                </div>

                <div className="navbar-user-section">

                    <div className="user-badge">

                        <div className="user-avatar">

                            {user?.first_name?.charAt(0)}

                        </div>

                        <span className="user-name">

                            {user?.first_name}

                        </span>

                    </div>

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