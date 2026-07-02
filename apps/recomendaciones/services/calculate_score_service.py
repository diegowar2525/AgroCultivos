# ── Score de compatibilidad ───────────────────────────────────────────
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
        if c["temp_min"] <= temp <= c["temp_max"]:
            p += 30
        if c["humedad_min"] <= humedad <= c["humedad_max"]:
            p += 25
        if c["precip_min"] <= precip <= c["precip_max"]:
            p += 20
        if c["altitud_min"] <= altitud <= c["altitud_max"]:
            p += 15
        if c["rad_min"] <= rad <= c["rad_max"]:
            p += 10
        scores[nombre] = p
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
    if c["humedad_min"] <= humedad <= c["humedad_max"]:
        just.append(f"Humedad {humedad}% compatible")
    if c["precip_min"] <= precip <= c["precip_max"]:
        just.append("Precipitación anual favorable")
    if c["altitud_min"] <= altitud <= c["altitud_max"]:
        just.append(f"Altitud {altitud}m adecuada")
    if c["rad_min"] <= rad <= c["rad_max"]:
        just.append("Radiación solar compatible")

    return nivel, (", ".join(just) if just else "Condiciones parcialmente compatibles")
