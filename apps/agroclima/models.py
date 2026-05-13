from django.db import models


class Ubicacion(models.Model):
    provincia = models.CharField(max_length=100)
    canton = models.CharField(max_length=100)
    parroquia = models.CharField(max_length=100, blank=True)

    latitud = models.DecimalField(max_digits=9, decimal_places=6)
    longitud = models.DecimalField(max_digits=9, decimal_places=6)

    altitud = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.canton}, {self.provincia}"


class CondicionClimatica(models.Model):
    ubicacion = models.ForeignKey(
        Ubicacion, on_delete=models.CASCADE, related_name="condiciones"
    )

    temperatura_promedio = models.FloatField()
    humedad = models.FloatField()
    precipitacion = models.FloatField()
    radiacion_solar = models.FloatField()

    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.ubicacion} - {self.fecha_registro}"


class RegistroMeteorologico(models.Model):
    ubicacion = models.ForeignKey(
        Ubicacion, on_delete=models.CASCADE, related_name="registros"
    )

    temperatura_min = models.FloatField()
    temperatura_max = models.FloatField()
    humedad = models.FloatField()
    velocidad_viento = models.FloatField()

    fecha = models.DateField()

    fuente_datos = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.ubicacion} - {self.fecha}"
