# ── Score de compatibilidad ───────────────────────────────────────────
def _puntaje_variable(valor, minimo, maximo, peso, margen_pct=0.15):
    """
    Puntaje de una sola variable (0 a `peso`), con un margen de
    tolerancia alrededor del rango ideal en vez de un corte todo-o-nada:
      - Dentro del rango ideal       -> puntaje completo.
      - Un poco fuera (dentro del margen) -> puntaje parcial, decae
        suavemente mientras más lejos del límite.
      - Muy fuera del margen         -> 0 puntos.
    El margen se calcula como un % del ancho del rango de ese cultivo,
    para que un cultivo con rango angosto no tenga el mismo margen
    absoluto que uno con rango amplio.
    """
    rango = maximo - minimo
    margen = rango * margen_pct if rango > 0 else 1

    if minimo <= valor <= maximo:
        return peso

    distancia = (minimo - valor) if valor < minimo else (valor - maximo)

    if distancia >= margen:
        return 0

    return peso * (1 - distancia / margen)


def _calcular_score(temp, humedad, precip, rad, altitud, info: dict) -> dict:
    """
    Puntaje 0-100 por cultivo usando 5 variables con pesos:
      Temperatura   30 pts
      Humedad       25 pts
      Precipitación 20 pts
      Altitud       15 pts
      Radiación     10 pts
    """
    scores = {}
    for nombre, c in info.items():
        p = 0
        p += _puntaje_variable(temp, c["temp_min"], c["temp_max"], 30)
        p += _puntaje_variable(humedad, c["humedad_min"], c["humedad_max"], 25)
        p += _puntaje_variable(precip, c["precip_min"], c["precip_max"], 20)
        p += _puntaje_variable(altitud, c["altitud_min"], c["altitud_max"], 15)
        p += _puntaje_variable(rad, c["rad_min"], c["rad_max"], 10)
        scores[nombre] = round(p)
    return scores


def _nivel_y_justificacion(score, temp, humedad, precip, rad, altitud, c):
    if score >= 90:
        nivel = "Excelente"
    elif score >= 70:
        nivel = "Buena"
    elif score >= 50:
        nivel = "Compatible"
    else:
        nivel = "Baja"

    just = []
    if c["temp_min"] <= temp <= c["temp_max"]:
        just.append(f"Temperatura {temp}°C dentro del rango ideal")
    elif _puntaje_variable(temp, c["temp_min"], c["temp_max"], 30) > 0:
        just.append(f"Temperatura {temp}°C cercana al rango ideal")

    if c["humedad_min"] <= humedad <= c["humedad_max"]:
        just.append(f"Humedad {humedad}% compatible")
    elif _puntaje_variable(humedad, c["humedad_min"], c["humedad_max"], 25) > 0:
        just.append(f"Humedad {humedad}% cercana al rango ideal")

    if c["precip_min"] <= precip <= c["precip_max"]:
        just.append("Precipitación anual favorable")
    elif _puntaje_variable(precip, c["precip_min"], c["precip_max"], 20) > 0:
        just.append("Precipitación anual cercana a lo favorable")

    if c["altitud_min"] <= altitud <= c["altitud_max"]:
        just.append(f"Altitud {altitud}m adecuada")
    elif _puntaje_variable(altitud, c["altitud_min"], c["altitud_max"], 15) > 0:
        just.append(f"Altitud {altitud}m cercana a lo adecuado")

    if c["rad_min"] <= rad <= c["rad_max"]:
        just.append("Radiación solar compatible")
    elif _puntaje_variable(rad, c["rad_min"], c["rad_max"], 10) > 0:
        just.append("Radiación solar cercana a lo compatible")

    return nivel, (", ".join(just) if just else "Condiciones parcialmente compatibles")
