from apps.cultivos.models import Cultivo
from apps.recomendaciones.models import ResultadoConsulta
from .calcular_score_service import calcular_score


def recomendar_cultivos(consulta, condicion):

    resultados = []

    cultivos = Cultivo.objects.select_related("requerimiento")

    for cultivo in cultivos:
        score = calcular_score(condicion, cultivo.requerimiento)

        resultado = ResultadoConsulta.objects.create(
            consulta=consulta,
            cultivo=cultivo,
            puntaje_compatibilidad=score,
            nivel_confianza=score,
            recomendado=score >= 70,
            justificacion=f"El cultivo es factible para su siembra con un {score}% de compatibilidad",
        )

        resultados.append(resultado)

    return resultados
