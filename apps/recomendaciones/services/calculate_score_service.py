def calcular_score(condicion, requerimiento):

    score = 0

    justificaciones = []

    # TEMPERATURA
    if (
        requerimiento.temperatura_min
        <= condicion.temperatura_promedio
        <= requerimiento.temperatura_max
    ):
        score += 40

        justificaciones.append("Temperatura adecuada")

    # HUMEDAD
    if requerimiento.humedad_min <= condicion.humedad <= requerimiento.humedad_max:
        score += 30

        justificaciones.append("Humedad compatible")

    # PRECIPITACIÓN
    if (
        requerimiento.precipitacion_min
        <= condicion.precipitacion
        <= requerimiento.precipitacion_max
    ):
        score += 20

        justificaciones.append("Precipitación favorable")

    # ALTITUD
    if (
        requerimiento.altitud_min
        <= condicion.ubicacion.altitud
        <= requerimiento.altitud_max
    ):
        score += 10

        justificaciones.append("Altitud adecuada")

    return {"score": score, "justificaciones": justificaciones}
