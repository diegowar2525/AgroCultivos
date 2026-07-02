import { useEffect, useState } from "react";

import { getDashboardData } from "../services/dashboardService";

import { buildDashboardStats } from "../utils/dashboardUtils";

export default function useDashboardStats() {

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const data = await getDashboardData();

                setStats(buildDashboardStats(data));

            } finally {

                setLoading(false);

            }

        }

        loadDashboard();

    }, []);

    return {

        stats,

        loading,

    };

}