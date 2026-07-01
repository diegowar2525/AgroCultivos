"""
Servicio principal de recomendación agroclimática.

Combina:
  1. Open-Meteo API
  2. Random Forest entrenado
  3. Score de compatibilidad para todos los cultivos
"""

import json
import os
import re

import joblib
import numpy as np

from .calculate_score_service import _calcular_score, _nivel_y_justificacion
from .weather_service import obtener_clima_openmeteo


_BASE = os.path.join(os.path.dirname(__file__), "..", "ml")

_clf = None
_le = None
_info = None


def _cargar_modelo():
    global _clf, _le, _info

    if _clf is not None:
        return

    _clf = joblib.load(os.path.join(_BASE, "modelo_cultivos.pkl"))
    _le = joblib.load(os.path.join(_BASE, "label_encoder.pkl"))

    with open(os.path.join(_BASE, "../management/data/info_cultivos.json"), encoding="utf-8") as archivo:
        _info = json.load(archivo)


def _parsear_ciclo_min(ciclo_texto: str) -> float:
    match = re.search(r"(\d+(?:\.\d+)?)", ciclo_texto or "")
    return float(match.group(1)) if match else 999.0


def recomendar_con_ml(
    latitud: float,
    longitud: float,
    top_n: int = 10,
    espacio: str = None,
    ciclo: str = None,
    debug: bool = False,
) -> dict:
    _cargar_modelo()

    clima = obtener_clima_openmeteo(latitud, longitud)

    temp = clima["temperatura"]
    humedad = clima["humedad"]
    precip = clima["precipitacion"]
    rad = clima["radiacion"]
    altitud = clima["altitud"]

    x_prediccion = np.array([[temp, humedad, precip, rad, altitud]])

    pred_idx = _clf.predict(x_prediccion)[0]
    predicho = _le.inverse_transform([pred_idx])[0]

    scores = _calcular_score(temp, humedad, precip, rad, altitud, _info)
    ordenados = sorted(scores.items(), key=lambda item: item[1], reverse=True)

    ciclo_meses = {
        "corto": (0, 3.0),
        "medio": (3.1, 5.0),
        "largo": (5.1, 999),
    }

    resultados = []

    for nombre, score in ordenados:
        cultivo_info = _info[nombre]

        if espacio and espacio.strip().lower() != "ambos":
            tipo_cultivo = cultivo_info.get("tipo_siembra", "").strip().lower()
            tipo_buscado = espacio.strip().lower()

            if tipo_cultivo != "ambos" and tipo_cultivo != tipo_buscado:
                continue

        if ciclo and ciclo.strip().lower() in ciclo_meses:
            rango_min, rango_max = ciclo_meses[ciclo.strip().lower()]
            meses_cultivo = _parsear_ciclo_min(cultivo_info.get("ciclo", ""))

            if not (rango_min <= meses_cultivo <= rango_max):
                continue

        nivel, justificacion = _nivel_y_justificacion(
            score,
            temp,
            humedad,
            precip,
            rad,
            altitud,
            cultivo_info,
        )

        resultados.append(
            {
                "cultivo": nombre,
                "score": score,
                "nivel": nivel,
                "recomendado": score >= 70,
                "predicho_por_arbol": nombre == predicho,
                "justificacion": justificacion,
                "tipo_siembra": cultivo_info["tipo_siembra"],
                "ciclo": cultivo_info["ciclo"],
                "rango_temp": f"{cultivo_info['temp_min']}–{cultivo_info['temp_max']}°C",
                "rango_humedad": f"{cultivo_info['humedad_min']}–{cultivo_info['humedad_max']}%",
                "rango_altitud": f"{cultivo_info['altitud_min']}–{cultivo_info['altitud_max']} msnm",
                "rango_precip": f"{cultivo_info['precip_min']}–{cultivo_info['precip_max']} mm/año",
            }
        )

    respuesta = {
        "clima": clima,
        "cultivo_arbol": predicho,
        "resultados": resultados[:top_n],
        "total_evaluados": len(resultados),
    }

    if debug:
        respuesta["debug_modelo"] = {
            "entrada_modelo": {
                "temperatura": temp,
                "humedad": humedad,
                "precipitacion": precip,
                "radiacion": rad,
                "altitud": altitud,
            },
            "pred_idx": int(pred_idx),
            "predicho": predicho,
            "top_scores": ordenados[:10],
            "clases_encoder": list(_le.classes_),
        }

    return respuesta
