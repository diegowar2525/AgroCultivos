from django.db import transaction

from apps.agroclima.models import CondicionClimatica
from apps.cultivos.models import Cultivo
from apps.recomendaciones.models import Consulta, ResultadoConsulta


@transaction.atomic
def guardar_consulta_recomendacion(
    *,
    usuario,
    ubicacion,
    clima: dict,
    resultado: dict,
    latitud: float,
    longitud: float,
) -> Consulta:
    condicion = CondicionClimatica.objects.create(
        ubicacion=ubicacion,
        temperatura_promedio=clima["temperatura"],
        humedad=clima["humedad"],
        precipitacion=clima["precipitacion"],
        radiacion_solar=clima["radiacion"],
    )

    consulta = Consulta.objects.create(
        usuario=usuario,
        condicion_climatica=condicion,
        observaciones=(
            f"Lat: {latitud}, Lon: {longitud} — "
            f"Árbol predijo: {resultado['cultivo_arbol']}"
        ),
    )

    nombres_cultivos = [item["cultivo"] for item in resultado["resultados"]]

    cultivos_por_nombre = {
        cultivo.nombre: cultivo
        for cultivo in Cultivo.objects.filter(nombre__in=nombres_cultivos)
    }

    resultados_para_crear = []
    cultivos_no_encontrados = []

    for item in resultado["resultados"]:
        cultivo = cultivos_por_nombre.get(item["cultivo"])

        if cultivo is None:
            cultivos_no_encontrados.append(item["cultivo"])
            continue

        resultados_para_crear.append(
            ResultadoConsulta(
                consulta=consulta,
                cultivo=cultivo,
                justificacion=item["justificacion"],
                nivel_confianza=float(item["score"]),
                puntaje_compatibilidad=float(item["score"]),
            )
        )

    ResultadoConsulta.objects.bulk_create(resultados_para_crear)

    consulta._cultivos_no_encontrados = cultivos_no_encontrados
    consulta._resultados_guardados = len(resultados_para_crear)

    return consulta
