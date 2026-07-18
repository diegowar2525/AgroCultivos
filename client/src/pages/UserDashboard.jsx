import Navbar from '../components/layout/Navbar';
import UserDashboardPanel from '../components/userDashboard/UserDashboardPanel';

export default function UserDashboard() {
    return (
        <div className="dashboard-user-page">
            <Navbar />
            <div className="dashboard-user-container">
                <UserDashboardPanel />
            </div>
        </div>
    );
}