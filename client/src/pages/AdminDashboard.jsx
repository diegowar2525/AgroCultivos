import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CrudView from '../components/AdminCrudView';
import modelsConfig from '../config/modelsConfig';

const AdminDashboard = () => {

    const [activeModel, setActiveModel] = useState('Cultivo');

    return (
        <div className="app-container">
            <Navbar />

            <main className="dashboard-layout">
                {/* Sidebar Menú de Modelos */}
                <aside className="dashboard-sidebar glass-card">
                    <h3 className="field-label" style={{ padding: '0 1rem', marginBottom: '1rem' }}>
                        Modelos de Datos
                    </h3>
                    {Object.keys(modelsConfig).map(modelKey => (
                        <button
                            key={modelKey}
                            className={`sidebar-item ${activeModel === modelKey ? 'active' : ''}`}
                            onClick={() => setActiveModel(modelKey)}
                        >
                            {modelsConfig[modelKey].title}
                        </button>
                    ))}
                </aside>

                {/* Contenido Principal */}
                <section className="dashboard-content">
                    <CrudView
                        modelName={activeModel}
                        config={modelsConfig[activeModel]}
                    />
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;