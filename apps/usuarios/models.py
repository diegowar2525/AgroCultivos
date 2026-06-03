from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    ROLES = (
        ("admin", "Administrador"),
        ("usuario", "Usuario"),
    )
    GENERO_CHOICES = (
        ("M", "Masculino"),
        ("F", "Femenino"),
        ("O", "Otro"),
    )

    cedula = models.CharField(max_length=10, unique=True, blank=True, null=True)
    nombres = models.CharField(max_length=100, blank=True, default="")
    apellidos = models.CharField(max_length=100, blank=True, default="")
    genero = models.CharField(
        max_length=1, choices=GENERO_CHOICES, blank=True, default=""
    )
    fecha_nacimiento = models.DateField(blank=True, null=True)
    es_agronomo = models.BooleanField(default=False)
    profesion = models.CharField(max_length=120, blank=True, default="")

    rol = models.CharField(max_length=20, choices=ROLES, default="usuario")
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} — {self.nombres} {self.apellidos}"

    def nombre_completo(self):
        return f"{self.nombres} {self.apellidos}".strip()
