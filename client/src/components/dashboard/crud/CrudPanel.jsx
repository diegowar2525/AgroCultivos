import { useState } from "react";
import { NavLink } from "react-router-dom";

import CrudView from "./CrudView";
import DashboardSidebar from "@/components/dashboard/overview/DashboardSidebar";

import modelsConfig from "@/config/modelsConfig";

export default function CrudPanel() {

    const [activeModel, setActiveModel] = useState("Cultivo");

    return (
        <>

            <div className="dashboard-layout">

                <DashboardSidebar
                    activeModel={activeModel}
                    setActiveModel={setActiveModel}
                />

                <main className="dashboard-content">

                    <CrudView
                        modelName={activeModel}
                        config={modelsConfig[activeModel]}
                    />

                </main>

            </div>
        </>
    );
}