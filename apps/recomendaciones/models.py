from django.db import models
from django.conf import settings

from apps.agroclima.models import CondicionClimatica
from apps.cultivos.models import Cultivo


class Consulta(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    condicion_climatica = models.ForeignKey(
        CondicionClimatica, on_delete=models.CASCADE
    )

    observaciones = models.TextField(blank=True)

    fecha_consulta = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Consulta {self.id}"


class ResultadoConsulta(models.Model):
    consulta = models.ForeignKey(
        Consulta, on_delete=models.CASCADE, related_name="resultados"
    )

    cultivo = models.ForeignKey(Cultivo, on_delete=models.CASCADE)

    justificacion = models.TextField()

    nivel_confianza = models.FloatField()

    puntaje_compatibilidad = models.FloatField()

    def __str__(self):
        return f"{self.cultivo.nombre} - {self.consulta.id}"
