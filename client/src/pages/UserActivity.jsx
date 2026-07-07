import { Sprout, Layers, Search, Users } from 'lucide-react';
import { useUserActivity } from '../hooks/useUserActivity';
import UserListItem from '../components/userActivity/UserListItem';
import UserActivityHeader from '../components/userActivity/UserActivityHeader';
import UserActivityTable from '../components/userActivity/UserActivityTable';

export default function UserActivity() {
    const {
        usuarios,
        usuariosFiltrados,
        usuarioSel,
        loadingUsuarios,
        loadingDetalle,
        busqueda,
        setBusqueda,
        tab,
        setTab,
        seleccionarUsuario,
        misCultivos,
        misCosechas,
        completados,
    } = useUserActivity();

    return (
        <div className="user-activity-page">
            {/* Panel izquierdo — lista de usuarios */}
            <aside className="user-activity-sidebar">
                <div className="user-activity-sidebar-header">
                    <p>Usuarios registrados</p>
                    <div className="user-activity-search">
                        <Search size={14} />
                        <input
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar usuario..."
                        />
                    </div>
                </div>

                <div className="user-activity-lista">
                    {loadingUsuarios ? (
                        <p className="user-activity-lista-mensaje">Cargando...</p>
                    ) : usuariosFiltrados.length === 0 ? (
                        <p className="user-activity-lista-mensaje">Sin resultados</p>
                    ) : (
                        usuariosFiltrados.map((u) => (
                            <UserListItem
                                key={u.id}
                                usuario={u}
                                seleccionado={usuarioSel?.id === u.id}
                                onClick={() => seleccionarUsuario(u)}
                            />
                        ))
                    )}
                </div>

                <div className="user-activity-sidebar-footer">
                    <p>{usuarios.length} usuarios en total</p>
                </div>
            </aside>

            {/* Panel derecho — detalle del usuario */}
            <section className="user-activity-detalle">
                {!usuarioSel ? (
                    <div className="user-activity-estado-inicial">
                        <div className="user-activity-estado-inicial-icono">
                            <Users size={32} />
                        </div>
                        <p className="user-activity-estado-inicial-titulo">Selecciona un usuario</p>
                        <p className="user-activity-estado-inicial-texto">
                            Elige un usuario de la lista para ver su actividad en el sistema.
                        </p>
                    </div>
                ) : (
                    <>
                        <UserActivityHeader
                            usuario={usuarioSel}
                            misCultivos={misCultivos}
                            misCosechas={misCosechas}
                            completados={completados}
                        />

                        <div className="user-activity-tabs">
                            <button
                                className={`user-activity-tab ${tab === 'cultivos' ? 'user-activity-tab--activo' : ''}`}
                                onClick={() => setTab('cultivos')}
                            >
                                <Sprout size={14} /> Mis Cultivos
                                <span className="user-activity-tab-count">{misCultivos.length}</span>
                            </button>
                            <button
                                className={`user-activity-tab ${tab === 'cosechas' ? 'user-activity-tab--activo' : ''}`}
                                onClick={() => setTab('cosechas')}
                            >
                                <Layers size={14} /> Mis Cosechas
                                <span className="user-activity-tab-count">{misCosechas.length}</span>
                            </button>
                        </div>

                        {loadingDetalle ? (
                            <p className="user-activity-lista-mensaje">Cargando cultivos...</p>
                        ) : tab === 'cultivos' ? (
                            <UserActivityTable
                                cultivos={misCultivos}
                                mensajeVacio="Este usuario no tiene cultivos pendientes."
                            />
                        ) : (
                            <UserActivityTable
                                cultivos={misCosechas}
                                mostrarProgreso
                                mensajeVacio="Este usuario no ha iniciado ningún cultivo."
                            />
                        )}
                    </>
                )}
            </section>
        </div>
    );
}