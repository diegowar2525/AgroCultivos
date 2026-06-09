// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import '../assets/css/dashboard.css';
import Navbar from '../components/Navbar';
import CrudView from '../components/CrudView';

const modelsConfig = {
    Cultivo: { title: 'Cultivos', columns: ['id', 'nombre', 'nombre_cientifico', 'temporada'] },
    Categoria: { title: 'Categorías', columns: ['id', 'nombre', 'descripcion'] },
    Requerimiento: { title: 'Requerimientos', columns: ['id', 'cultivo_id', 'agua_mm', 'luz_horas'] },
    SeguimientoCultivo: { title: 'Seguimientos', columns: ['id', 'cultivo_id', 'usuario_id', 'fecha_registro'] },
    Amenaza: { title: 'Amenazas', columns: ['id', 'nombre', 'tipo_amenaza_id', 'severidad'] },
    TipoAmenaza: { title: 'Tipos de Amenaza', columns: ['id', 'nombre'] },
    TipoSuelo: { title: 'Tipos de Suelo', columns: ['id', 'nombre', 'ph_ideal'] },
    Usuario: { title: 'Usuarios', columns: ['id', 'username', 'email', 'is_staff'] }
};

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