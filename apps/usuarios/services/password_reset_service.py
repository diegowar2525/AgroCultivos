import random

from ..models import CodigoRestablecimiento, Usuario
from .email_service import enviar_codigo_verificacion


def _generar_codigo() -> str:
    return f"{random.randint(0, 999999):06d}"


def solicitar_codigo(correo: str) -> None:
    """
    Genera un código de 6 dígitos y lo envía por correo al usuario.

    Por seguridad, si el correo no está registrado NO se lanza error:
    simplemente no se envía nada. Así una persona externa no puede usar
    este endpoint para averiguar qué correos existen en el sistema.
    """
    try:
        usuario = Usuario.objects.get(email=correo)
    except Usuario.DoesNotExist:
        return

    codigo = _generar_codigo()

    CodigoRestablecimiento.objects.create(usuario=usuario, codigo=codigo)

    enviar_codigo_verificacion(usuario, codigo)


def _obtener_codigo_vigente(correo: str, codigo: str) -> CodigoRestablecimiento:
    try:
        usuario = Usuario.objects.get(email=correo)
    except Usuario.DoesNotExist:
        raise ValueError("Código incorrecto o expirado.")

    registro = (
        CodigoRestablecimiento.objects.filter(usuario=usuario, codigo=codigo)
        .order_by("-creado")
        .first()
    )

    if registro is None or not registro.esta_vigente():
        raise ValueError("Código incorrecto o expirado.")

    return registro


def verificar_codigo(correo: str, codigo: str) -> None:
    _obtener_codigo_vigente(correo, codigo)


def cambiar_password(correo: str, codigo: str, nueva_password: str) -> None:
    registro = _obtener_codigo_vigente(correo, codigo)

    usuario = registro.usuario
    usuario.set_password(nueva_password)
    usuario.save()

    registro.usado = True
    registro.save()
