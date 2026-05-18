from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    ROLES = (
        ("admin", "Administrador"),
        ("usuario", "Usuario"),
    )

    rol = models.CharField(
        max_length=20,
        choices=ROLES,
        default="usuario"
    )

    fecha_registro = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.username