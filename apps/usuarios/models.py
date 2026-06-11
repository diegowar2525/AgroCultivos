from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    GENERO_CHOICES = (
        ("M", "Masculino"),
        ("F", "Femenino"),
        ("O", "Otro"),
    )

    cedula = models.CharField(max_length=10, unique=True, blank=False, null=False)
    email = models.EmailField(unique=True, blank=False, null=False)
    genero = models.CharField(
        max_length=1, choices=GENERO_CHOICES, blank=True, null=True
    )
    fecha_nacimiento = models.DateField(blank=True, null=True)
    profesion = models.CharField(max_length=120, blank=True, default="Sin profesión")
    fecha_registro = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = ["email", "cedula"]

    def nombre_completo(self):
        return f"{self.first_name} {self.last_name}".strip()
