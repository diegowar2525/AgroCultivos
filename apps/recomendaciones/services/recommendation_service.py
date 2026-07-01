from .location_service import construir_zona, obtener_ubicacion_cercana
from .ml_service import recomendar_con_ml
from .persistence_service import guardar_consulta_recomendacion


def generar_recomendacion_geo(
    *,
    usuario,
    latitud,
    longitud,
    top_n=10,
    espacio=None,
    ciclo=None,
) -> dict:
    latitud, longitud, top_n = validar_parametros_geo(latitud, longitud, top_n)

    resultado = recomendar_con_ml(
        latitud=latitud,
        longitud=longitud,
        top_n=top_n,
        espacio=espacio,
        ciclo=ciclo,
    )

    clima = resultado["clima"]
    ubicacion_cercana = obtener_ubicacion_cercana(latitud, longitud)

    consulta = guardar_consulta_recomendacion(
        usuario=usuario,
        ubicacion=ubicacion_cercana,
        clima=clima,
        resultado=resultado,
        latitud=latitud,
        longitud=longitud,
    )

    respuesta = {
        "consulta_id": consulta.id,
        "clima": clima,
        "cultivo_predicho_arbol": resultado["cultivo_arbol"],
        "total_evaluados": resultado["total_evaluados"],
        "resultados": resultado["resultados"],
        "zona": construir_zona(ubicacion_cercana),
        "persistencia": {
            "resultados_guardados": getattr(consulta, "_resultados_guardados", 0),
            "cultivos_no_encontrados": getattr(consulta, "_cultivos_no_encontrados", []),
        },
    }

    if "debug_modelo" in resultado:
        respuesta["debug_modelo"] = resultado["debug_modelo"]

    return respuesta


def validar_parametros_geo(latitud, longitud, top_n):
    if latitud is None or longitud is None:
        raise ValueError("Se requieren latitud y longitud.")

    try:
        latitud = float(latitud)
        longitud = float(longitud)
    except (ValueError, TypeError):
        raise ValueError("Coordenadas inválidas.")

    try:
        top_n = int(top_n)
    except (ValueError, TypeError):
        raise ValueError("top_n debe ser un número entero.")

    if top_n < 1:
        raise ValueError("top_n debe ser mayor o igual a 1.")

    return latitud, longitud, top_n
