from django.db import models
from django.conf import settings

from apps.agroclima.models import Ubicacion
from apps.cultivos.models import Cultivo


class TipoConsulta(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre


class Consulta(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    ubicacion = models.ForeignKey(Ubicacion, on_delete=models.CASCADE)

    tipo_consulta = models.ForeignKey(TipoConsulta, on_delete=models.PROTECT)

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
