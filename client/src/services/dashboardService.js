import api from "./api";

export async function getDashboardData() {
    const [
        usuarios,
        consultas,
        cultivosUsuario,
        cultivos,
    ] = await Promise.all([
        api.get("/api/usuarios/admin/usuarios/").catch(() => ({ data: [] })),
        api.get("/api/recomendaciones/consultas/").catch(() => ({ data: [] })),
        api.get("/api/cultivos/cultivo-usuario/").catch(() => ({ data: [] })),
        api.get("/api/cultivos/cultivos/").catch(() => ({ data: [] })),
    ]);

    return {
        usuarios: usuarios.data?.results || usuarios.data || [],
        consultas: consultas.data?.results || consultas.data || [],
        cultivosUsuario:
            cultivosUsuario.data?.results || cultivosUsuario.data || [],
        cultivos: cultivos.data?.results || cultivos.data || [],
    };
}