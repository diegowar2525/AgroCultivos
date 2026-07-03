import Navbar from '../components/layout/Navbar';
import EmptyRecommendationsState from '../components/recommendations/EmptyRecommendationsState';
import RecommendationResults from '../components/recommendations/RecommendationResults';
import RecommendationsSidebar from '../components/recommendations/RecommendationsSidebar';
import { useRecommendations } from '../hooks/useRecommendations';

export default function Recommendations() {
    const {
        espacio,
        setEspacio,
        ciclo,
        setCiclo,
        loading,
        error,
        resultado,
        agregarExito,
        agregarLoading,
        agregarError,
        setAgregarError,
        buscar,
        agregarCultivo,
        nuevaConsulta,
    } = useRecommendations();

    return (
        <div className="recommendations-page">
            <Navbar />

            <main className="recommendations-layout">
                <RecommendationsSidebar
                    espacio={espacio}
                    setEspacio={setEspacio}
                    ciclo={ciclo}
                    setCiclo={setCiclo}
                    zona={resultado?.zona}
                    error={error}
                    loading={loading}
                    onBuscar={buscar}
                />

                {resultado ? (
                    <RecommendationResults
                        resultados={resultado.resultados}
                        onNueva={nuevaConsulta}
                        onAgregar={agregarCultivo}
                        agregarLoading={agregarLoading}
                        agregarExito={agregarExito}
                        agregarError={agregarError}
                        setAgregarError={setAgregarError}
                    />
                ) : (
                    <EmptyRecommendationsState />
                )}
            </main>
        </div>
    );
}
