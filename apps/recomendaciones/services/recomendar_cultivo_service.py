from apps.cultivos.models import Cultivo
from .calcular_score_service import calcular_score


def recomendar_cultivos(condicion):

    resultados = []

    cultivos = Cultivo.objects.select_related("requerimiento")

    for cultivo in cultivos:
        score = calcular_score(condicion, cultivo.requerimiento)

        resultados.append({"cultivo": cultivo, "score": score})

    resultados.sort(key=lambda x: x["score"], reverse=True)

    return resultados
