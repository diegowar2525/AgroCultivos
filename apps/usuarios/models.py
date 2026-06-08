from django.db import models
from django.contrib.auth.models import AbstractUser


class Rol(models.Model):
    nombre = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nombre


class Usuario(AbstractUser):
    GENERO_CHOICES = (
        ("M", "Masculino"),
        ("F", "Femenino"),
        ("O", "Otro"),
    )

    cedula = models.CharField(max_length=10, unique=True, blank=True, null=True)
    genero = models.CharField(max_length=1, choices=GENERO_CHOICES, blank=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    profesion = models.CharField(max_length=120, blank=True, default="")

    rol = models.ForeignKey(Rol, on_delete=models.PROTECT, related_name="usuarios")

    fecha_registro = models.DateTimeField(auto_now_add=True)

    def nombre_completo(self):
        return f"{self.first_name} {self.last_name}".strip()
