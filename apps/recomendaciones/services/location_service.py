import math

from apps.agroclima.models import Ubicacion


def calcular_distancia(ubicacion, latitud: float, longitud: float) -> float:
    return math.sqrt(
        (float(ubicacion.latitud) - latitud) ** 2
        + (float(ubicacion.longitud) - longitud) ** 2
    )


def obtener_ubicacion_cercana(latitud: float, longitud: float) -> Ubicacion:
    ubicaciones = Ubicacion.objects.select_related(
        "parroquia__canton__provincia"
    )

    if not ubicaciones.exists():
        raise LookupError("No existen ubicaciones registradas en el sistema.")

    return min(
        ubicaciones,
        key=lambda ubicacion: calcular_distancia(ubicacion, latitud, longitud),
    )


def construir_zona(ubicacion: Ubicacion) -> dict:
    parroquia = ubicacion.parroquia

    return {
        "parroquia": parroquia.nombre,
        "canton": parroquia.canton.nombre,
        "provincia": parroquia.canton.provincia.nombre,
        "altitud": float(ubicacion.altitud),
    }
