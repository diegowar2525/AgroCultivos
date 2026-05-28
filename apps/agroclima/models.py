from django.db import models


class Provincia(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Canton(models.Model):
    provincia = models.ForeignKey(
        Provincia, on_delete=models.CASCADE, related_name="cantones"
    )
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Parroquia(models.Model):
    canton = models.ForeignKey(
        Canton, on_delete=models.CASCADE, related_name="parroquias"
    )
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Ubicacion(models.Model):
    parroquia = models.ForeignKey(Parroquia, on_delete=models.CASCADE)
    latitud = models.DecimalField(max_digits=10, decimal_places=6)
    longitud = models.DecimalField(max_digits=10, decimal_places=6)
    altitud = models.FloatField()

    def __str__(self):
        return f"{self.parroquia.nombre}"


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
        return f"Clima {self.ubicacion}"
