from apps.cultivos.models import Cultivo
from apps.recomendaciones.models import ResultadoConsulta

from .calculate_score_service import calcular_score


def recomendar_cultivos(consulta, condicion):

    resultados = []

    cultivos = Cultivo.objects.select_related("requerimiento")

    for cultivo in cultivos:
        evaluacion = calcular_score(condicion, cultivo.requerimiento)

        score = evaluacion["score"]

        justificaciones = evaluacion["justificaciones"]

        # NIVEL DE COMPATIBILIDAD
        if score >= 75:
            nivel = "ALTO"

        elif score >= 50:
            nivel = "MEDIO"

        else:
            nivel = "BAJO"

        resultado = ResultadoConsulta.objects.create(
            consulta=consulta,
            cultivo=cultivo,
            puntaje_compatibilidad=score,
            nivel_confianza=score,
            recomendado=score >= 75,
            justificacion=", ".join(justificaciones),
        )

        resultados.append({"resultado": resultado, "nivel": nivel})

    # ordenar por score descendente
    resultados.sort(key=lambda r: r["resultado"].puntaje_compatibilidad, reverse=True)

    return resultados
