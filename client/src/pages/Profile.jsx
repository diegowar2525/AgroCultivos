import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {

    const { user } = useAuth();

    return (
        <div className="app-container">

            <Navbar />

            <div
                style={{
                    maxWidth: '900px',
                    margin: '2rem auto'
                }}
            >
                <pre>
                    {JSON.stringify(
                        user,
                        null,
                        2
                    )}
                </pre>
            </div>

        </div>
    );
}