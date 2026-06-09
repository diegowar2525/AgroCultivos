import Navbar from '../components/Navbar';
import '../App.css';

export default function Dashboard() {

    return (
        <div className="app-container">

            <Navbar />

            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '2rem'
                }}
            >
                <h1>
                    Dashboard AgroCultivos
                </h1>

                <p>
                    Sistema de recomendaciones agrícolas.
                </p>

            </div>

        </div>
    );
}