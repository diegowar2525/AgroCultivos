import modelsConfig from "@/config/modelsConfig";

export default function DashboardSidebar({

    activeModel,

    setActiveModel,

}) {

    return (

        <aside className="dashboard-sidebar">

            {Object.keys(modelsConfig).map((modelKey) => (

                <button

                    key={modelKey}

                    className={`sidebar-item ${activeModel === modelKey ? "active" : ""
                        }`}

                    onClick={() => setActiveModel(modelKey)}

                >

                    {modelsConfig[modelKey].title}

                </button>

            ))}

        </aside>

    );

}