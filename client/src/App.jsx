import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Home from './pages/Home';
import LoadingScreen from './components/common/LoadingScreen';
import DashboardView from "./components/dashboard/overview/DashboardView";
import CrudPanel from "./components/dashboard/crud/CrudPanel";
import PrivateRoute from './routes/PrivateRoute';

function App() {
    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAppReady(true);
        }, 600);

        return () => clearTimeout(timer);
    }, []);

    if (!appReady) {
        return <LoadingScreen />;
    }
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute adminOnly>
                            <AdminDashboard />
                        </PrivateRoute>
                    }
                >
                    <Route
                        index
                        element={<DashboardView />}
                    />

                    <Route
                        path="panel"
                        element={<CrudPanel />}
                    />
                </Route>

                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;