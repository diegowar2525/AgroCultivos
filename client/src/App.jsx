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
import DashboardView from "./components/adminDashboard/overview/DashboardView";
import CrudPanel from "./components/adminDashboard/crud/CrudPanel";
import PrivateRoute from './routes/PrivateRoute';
import Recomendaciones from './pages/Recommendations';
import MyCrops from './pages/MyCrops';
import MisCosechas from './pages/MyHarvests';
import CropInfo from './pages/CropInfo';
import UserCropManagement from './pages/UserCropManagement';
import UserDashboard from './pages/UserDashboard';

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
                        path="admin-panel"
                        element={<CrudPanel />}
                    />
                    <Route
                        path="users"
                        element={<UserCropManagement />}
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

                <Route
                    path="/recommendations"
                    element={
                        <PrivateRoute userOnly>
                            <Recomendaciones />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/my-dashboard"
                    element={
                        <PrivateRoute userOnly>
                            <UserDashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/my-crops"
                    element={
                        <PrivateRoute userOnly>
                            <MyCrops />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/my-harvests"
                    element={
                        <PrivateRoute userOnly>
                            <MisCosechas />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/crop-info/:id"
                    element={
                        <PrivateRoute userOnly>
                            <CropInfo />
                        </PrivateRoute>
                    }
                />
            </Routes>

        </BrowserRouter>
    );
}

export default App;


