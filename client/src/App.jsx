import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import './App.css';

// Componente para proteger las rutas privadas
function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas Privadas */}
                <Route path="/" element={
                    <PrivateRoute>
                        <div className="app-container">
                            {/* Navbar se mostrará solo cuando estés logueado */}
                            <Navbar />
                            {/*<Dashboard />*/}
                        </div>
                    </PrivateRoute>
                } />

                <Route path="/historial" element={
                    <PrivateRoute>
                        <div className="app-container">
                            <Navbar />
                            {/*<Historial />*/}
                        </div>
                    </PrivateRoute>
                } />

                {/* Redirección por defecto si la URL no existe */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}