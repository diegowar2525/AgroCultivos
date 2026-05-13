from django.db import models


class CategoriaCultivo(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre


class TipoSuelo(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)

    ph_min = models.FloatField()
    ph_max = models.FloatField()

    def __str__(self):
        return self.nombre


class Cultivo(models.Model):
    DIFICULTADES = (
        ("baja", "Baja"),
        ("media", "Media"),
        ("alta", "Alta"),
    )

    categoria = models.ForeignKey(
        CategoriaCultivo, on_delete=models.CASCADE, related_name="cultivos"
    )

    nombre = models.CharField(max_length=100)
    nombre_cientifico = models.CharField(max_length=150, blank=True)

    descripcion = models.TextField()

    tiempo_cosecha_dias = models.PositiveIntegerField()

    nivel_dificultad = models.CharField(max_length=20, choices=DIFICULTADES)

    imagen = models.ImageField(upload_to="cultivos/", blank=True, null=True)

    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre


class RequerimientoCultivo(models.Model):
    cultivo = models.OneToOneField(
        Cultivo, on_delete=models.CASCADE, related_name="requerimientos"
    )

    tipo_suelo = models.ForeignKey(TipoSuelo, on_delete=models.CASCADE)

    temperatura_min = models.FloatField()
    temperatura_max = models.FloatField()

    humedad_min = models.FloatField()
    humedad_max = models.FloatField()

    altitud_min = models.FloatField()
    altitud_max = models.FloatField()

    precipitacion_min = models.FloatField()
    precipitacion_max = models.FloatField()

    horas_sol = models.FloatField()

    def __str__(self):
        return f"Requerimientos de {self.cultivo.nombre}"
