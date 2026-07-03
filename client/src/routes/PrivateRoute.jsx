import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from '../components/common/LoadingScreen';

export default function PrivateRoute({
    children,
    adminOnly = false,
    userOnly = false
}) {
    const {
        isAuthenticated,
        user
    } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !user?.is_staff) {
        return <Navigate to="/" replace />;
    }

    if (userOnly && user?.is_staff) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}