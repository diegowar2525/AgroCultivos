import { useNavigate } from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import AchievementsPanel from '../components/myHarvests/gamification/AchievementsPanel';
import HarvestChart from '../components/myHarvests/HarvestChart';
import MyHarvestsEmptyState from '../components/myHarvests/MyHarvestsEmptyState';
import MyHarvestsHeader from '../components/myHarvests/MyHarvestsHeader';
import MyHarvestsStats from '../components/myHarvests/MyHarvestsStats';
import MyHarvestsTable from '../components/myHarvests/MyHarvestsTable';
import useMyHarvests from '../hooks/useMyHarvests';

export default function MyHarvests() {
    const navigate = useNavigate();
    const {
        harvests,
        loading,
        stats,
        expandedHarvestId,
        toggleExpandedHarvest,
        reloadHarvests,
    } = useMyHarvests();

    return (
        <div className="my-harvests-page">
            <Navbar />

            <main className="my-harvests-container">
                <MyHarvestsHeader />

                {loading ? (
                    <p className="my-harvests-loading">Cargando...</p>
                ) : harvests.length === 0 ? (
                    <MyHarvestsEmptyState onGoToMyCrops={() => navigate('/my-crops')} />
                ) : (
                    <section className="my-harvests-layout">
                        <div className="my-harvests-main">
                            <MyHarvestsStats stats={stats} />

                            <MyHarvestsTable
                                harvests={harvests}
                                expandedHarvestId={expandedHarvestId}
                                onToggleExpanded={toggleExpandedHarvest}
                                onReloadHarvests={reloadHarvests}
                                onViewCropInfo={(cropId) => navigate(`/crop-info/${cropId}`)}
                            />
                        </div>

                        <aside className="my-harvests-aside" aria-label="Logros y estadísticas">
                            <HarvestChart harvests={harvests} />
                            <AchievementsPanel harvests={harvests} />
                        </aside>
                    </section>
                )}
            </main>
        </div>
    );
}
