from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    ROLES = (
        ("admin", "Administrador"),
        ("usuario", "Usuario"),
    )

    rol = models.CharField(max_length=20, choices=ROLES, default="usuario")
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


class PerfilUsuario(models.Model):
    TIPOS_HUERTO = (
        ("urbano", "Huerto Urbano"),
        ("patio", "Patio"),
        ("terraza", "Terraza"),
        ("rural", "Rural"),
    )

    NIVELES = (
        ("bajo", "Bajo"),
        ("medio", "Medio"),
        ("alto", "Alto"),
    )

    usuario = models.OneToOneField(
        Usuario, on_delete=models.CASCADE, related_name="perfil"
    )

    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    telefono = models.CharField(max_length=20, blank=True)

    provincia = models.CharField(max_length=100)
    canton = models.CharField(max_length=100)

    tipo_huerto = models.CharField(max_length=20, choices=TIPOS_HUERTO)

    experiencia_agricola = models.CharField(
        max_length=20, choices=NIVELES, default="bajo"
    )

    def nombre_completo(self):
        return f"{self.nombre} {self.apellido}"

    def __str__(self):
        return self.nombre_completo()
