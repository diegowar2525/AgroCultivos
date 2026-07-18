import { useState } from 'react';

import CrudView from './CrudView';
import DashboardSidebar from '../overview/DashboardSidebar';
import modelsConfig from '@/config/modelsConfig';

export default function CrudPanel() {
    const [activeModel, setActiveModel] = useState('Cultivo');

    const activeConfig = modelsConfig[activeModel];

    return (
        <div className="dashboard-layout">
            <DashboardSidebar
                activeModel={activeModel}
                setActiveModel={setActiveModel}
            />

            <main className="dashboard-content">
                {activeConfig ? (
                    <CrudView
                        modelName={activeModel}
                        config={activeConfig}
                    />
                ) : (
                    <div className="glass-card">
                        No se encontró la configuración de {activeModel}.
                    </div>
                )}
            </main>
        </div>
    );
}