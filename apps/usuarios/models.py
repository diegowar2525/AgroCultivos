from datetime import timedelta
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


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

class CodigoRestablecimiento(models.Model):
    """
    Código de 6 dígitos para el flujo de "olvidé mi contraseña".
    Cada solicitud crea un registro nuevo; los anteriores del mismo
    usuario quedan obsoletos aunque no se borren (auditoría simple).
    """

    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="codigos_restablecimiento",
    )
    codigo = models.CharField(max_length=6)
    creado = models.DateTimeField(auto_now_add=True)
    usado = models.BooleanField(default=False)

    def esta_vigente(self):
        minutos = getattr(settings, "CODIGO_RESTABLECIMIENTO_MINUTOS", 15)
        vencimiento = self.creado + timedelta(minutes=minutos)
        return not self.usado and timezone.now() <= vencimiento

    def __str__(self):
        return f"{self.usuario} - {self.codigo} ({'usado' if self.usado else 'vigente'})"