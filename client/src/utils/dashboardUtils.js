export function buildDashboardStats(data) {
    const {
        usuarios,
        consultas,
        cultivosUsuario,
        cultivos,
    } = data;

    const frecuencia = {};

    cultivosUsuario.forEach((cultivo) => {
        const nombre = cultivo.cultivo_nombre || `#${cultivo.cultivo}`;

        frecuencia[nombre] = (frecuencia[nombre] || 0) + 1;
    });

    const topCultivos = Object.entries(frecuencia)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    const ahora = new Date();

    const porMes = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(ahora);

        d.setDate(ahora.getDate() - (6 - i));

        const dia = d.getDate();
        const mes = d.getMonth();
        const anio = d.getFullYear();

        const count = usuarios.filter((usuario) => {
            const fecha = new Date(usuario.date_joined || 0);

            return (
                fecha.getDate() === dia &&
                fecha.getMonth() === mes &&
                fecha.getFullYear() === anio
            );
        }).length;

        return {
            label: `${dia}/${mes + 1}`,
            count,
        };
    });

    const agronomos = usuarios.filter(
        (usuario) => usuario.profesion === "Agrónomo"
    ).length;

    const noAgronomos = usuarios.length - agronomos;

    const pctAgronomo =
        usuarios.length > 0
            ? Math.round((agronomos / usuarios.length) * 100)
            : 0;

    return {
        totalUsuarios: usuarios.length,
        totalConsultas: consultas.length,
        totalCultivos: cultivos.length,
        cultivosActivos: cultivosUsuario.length,

        masRecomendado: topCultivos[0]
            ? {
                nombre: topCultivos[0][0],
                count: topCultivos[0][1],
            }
            : null,

        topCultivos,

        porMes,

        agronomos,

        noAgronomos,

        pctAgronomo,
    };
}