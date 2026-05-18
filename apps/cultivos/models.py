from django.db import models


class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre


class Requerimiento(models.Model):
    altitud_min = models.FloatField()
    altitud_max = models.FloatField()

    humedad_min = models.FloatField()
    humedad_max = models.FloatField()

    precipitacion_min = models.FloatField()
    precipitacion_max = models.FloatField()

    temperatura_min = models.FloatField()
    temperatura_max = models.FloatField()

    horas_sol = models.FloatField()

    def __str__(self):
        return f"Req {self.id}"


class Cultivo(models.Model):
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.CASCADE
    )

    requerimiento = models.OneToOneField(
        Requerimiento,
        on_delete=models.CASCADE
    )

    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(
        upload_to='cultivos/',
        blank=True,
        null=True
    )

    tiempo_cosecha = models.PositiveIntegerField(
        help_text="Días"
    )

    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre