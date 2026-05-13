from django.db import models
from apps.usuarios.models import Usuario
from apps.agroclima.models import Ubicacion, CondicionClimatica
from apps.cultivos.models import Cultivo


class ReglaDecision(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()

    peso_temperatura = models.FloatField(default=0.35)
    peso_humedad = models.FloatField(default=0.20)
    peso_altitud = models.FloatField(default=0.20)
    peso_precipitacion = models.FloatField(default=0.15)
    peso_suelo = models.FloatField(default=0.10)

    activa = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre


class ConsultaRecomendacion(models.Model):
    usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, related_name="consultas"
    )

    ubicacion = models.ForeignKey(Ubicacion, on_delete=models.CASCADE)

    condicion_climatica = models.ForeignKey(
        CondicionClimatica, on_delete=models.CASCADE
    )

    regla = models.ForeignKey(
        "ReglaDecision",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="consultas",
    )

    fecha_consulta = models.DateTimeField(auto_now_add=True)

    observaciones = models.TextField(blank=True)

    def __str__(self):
        return f"Consulta {self.id} - {self.usuario}"


class ResultadoRecomendacion(models.Model):
    consulta = models.ForeignKey(
        ConsultaRecomendacion, on_delete=models.CASCADE, related_name="resultados"
    )

    cultivo = models.ForeignKey(Cultivo, on_delete=models.CASCADE)

    puntaje_compatibilidad = models.FloatField()

    nivel_confianza = models.FloatField()

    recomendado = models.BooleanField(default=True)

    justificacion = models.TextField()

    class Meta:
        ordering = ["-puntaje_compatibilidad"]

    def __str__(self):
        return f"{self.cultivo.nombre} ({self.puntaje_compatibilidad}%)"
