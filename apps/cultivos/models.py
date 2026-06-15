from django.db import models
from django.conf import settings


class TipoSuelo(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre


class TipoAmenaza(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre


class Estado(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre


class Amenaza(models.Model):
    tipo_amenaza = models.ForeignKey(TipoAmenaza, on_delete=models.CASCADE)

    nombre = models.CharField(max_length=100)

    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre


class Cultivo(models.Model):
    categoria = models.ForeignKey(
        Categoria, on_delete=models.CASCADE, related_name="cultivos"
    )

    nombre = models.CharField(max_length=100)

    descripcion = models.TextField()

    imagen = models.ImageField(upload_to="cultivos/", blank=True, null=True)

    tiempo_cosecha = models.PositiveIntegerField(help_text="Días")

    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre


class Especificacion(models.Model):
    cultivo = models.ForeignKey(Cultivo, on_delete=models.CASCADE)

    altitud_min = models.FloatField()
    altitud_max = models.FloatField()

    horas_sol = models.FloatField()

    humedad_min = models.FloatField()
    humedad_max = models.FloatField()

    precipitacion_min = models.FloatField()
    precipitacion_max = models.FloatField()

    temperatura_min = models.FloatField()
    temperatura_max = models.FloatField()

    radiacion_min = models.FloatField()
    radiacion_max = models.FloatField()

    def __str__(self):
        return f"Especificacion de {self.cultivo.nombre}"


class AmenazaCultivo(models.Model):
    cultivo = models.ForeignKey(Cultivo, on_delete=models.CASCADE)

    amenaza = models.ForeignKey(Amenaza, on_delete=models.CASCADE)

    nivel_riesgo = models.FloatField()

    class Meta:
        unique_together = ("cultivo", "amenaza")


class CultivoTipoSuelo(models.Model):
    cultivo = models.ForeignKey(Cultivo, on_delete=models.CASCADE)

    tipo_suelo = models.ForeignKey(TipoSuelo, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("cultivo", "tipo_suelo")


class CultivoUsuario(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    cultivo = models.ForeignKey(Cultivo, on_delete=models.CASCADE)

    estado = models.ForeignKey(Estado, on_delete=models.PROTECT)

    fecha_siembra = models.DateField()

    fecha_cosecha_estimada = models.DateField()

    fecha_cosecha_real = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.usuario} - {self.cultivo}"


class SeguimientoCultivo(models.Model):
    cultivo_usuario = models.ForeignKey(
        CultivoUsuario, on_delete=models.CASCADE, related_name="seguimientos"
    )

    altura_planta = models.FloatField()

    estado_fenologico = models.CharField(max_length=100)

    observaciones = models.TextField(blank=True)

    fecha_registro = models.DateTimeField(auto_now_add=True)

    imagen = models.ImageField(upload_to="seguimientos/", blank=True, null=True)

    def __str__(self):
        return f"Seguimiento {self.id}"
