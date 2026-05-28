def calcular_score(condicion, requerimiento):

    score = 0

    if (
        requerimiento.temperatura_min
        <= condicion.temperatura_promedio
        <= requerimiento.temperatura_max
    ):
        score += 25

    if requerimiento.humedad_min <= condicion.humedad <= requerimiento.humedad_max:
        score += 25

    if (
        requerimiento.precipitacion_min
        <= condicion.precipitacion
        <= requerimiento.precipitacion_max
    ):
        score += 25

    if (
        requerimiento.altitud_min
        <= condicion.ubicacion.altitud
        <= requerimiento.altitud_max
    ):
        score += 25

    return score
