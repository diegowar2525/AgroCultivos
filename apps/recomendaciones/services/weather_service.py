import requests
import time


def obtener_clima_openmeteo(latitud: float, longitud: float) -> dict:
    """
    Llama a Open-Meteo forecast + elevation.

    Retorna:
      - temperatura: °C actual
      - humedad: % actual
      - precipitacion: mm/año estimada
      - radiacion: MJ/m²/día promedio de 7 días
      - altitud: msnm

    No requiere API key.
    """

    url_forecast = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={latitud}&longitude={longitud}"
        "&current=temperature_2m,relative_humidity_2m"
        "&daily=precipitation_sum,shortwave_radiation_sum"
        "&timezone=America%2FGuayaquil"
        "&forecast_days=7"
    )

    url_elevation = (
        "https://api.open-meteo.com/v1/elevation"
        f"?latitude={latitud}&longitude={longitud}"
    )

    for intento in range(3):
        try:
            r_f = requests.get(url_forecast, timeout=15)
            r_e = requests.get(url_elevation, timeout=15)

            r_f.raise_for_status()
            r_e.raise_for_status()

            forecast_data = r_f.json()
            elevation_data = r_e.json()

            cur = forecast_data.get("current", {})
            daily = forecast_data.get("daily", {})

            altitud = elevation_data.get("elevation", [0])[0]

            precip_dias = daily.get("precipitation_sum", [])
            precip_validos = [p for p in precip_dias if p is not None]

            precip_diaria_prom = (
                sum(precip_validos) / len(precip_validos) if precip_validos else 2.0
            )

            precip_anio = precip_diaria_prom * 365

            radiacion_dias = daily.get("shortwave_radiation_sum", [])
            radiacion_validos = [r for r in radiacion_dias if r is not None]

            radiacion_prom = (
                sum(radiacion_validos) / len(radiacion_validos)
                if radiacion_validos
                else 18.0
            )

            return {
                "temperatura": round(cur.get("temperature_2m", 20.0), 1),
                "humedad": round(cur.get("relative_humidity_2m", 65.0), 1),
                "precipitacion": round(precip_anio, 1),
                "radiacion": round(radiacion_prom, 1),
                "altitud": round(float(altitud), 1),
            }

        except requests.RequestException:
            if intento < 2:
                time.sleep(1)
            else:
                raise RuntimeError("Open-Meteo no respondió después de 3 intentos.")
