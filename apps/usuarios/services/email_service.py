from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string


def enviar_bienvenida(usuario, password_plano: str) -> None:
    """
    Envía el correo de bienvenida con las credenciales de acceso
    justo después de un registro exitoso.

    No lanza excepción si el envío falla (ej. credenciales de correo
    mal configuradas): el registro de la cuenta ya se completó y no
    debe fallar por un problema de correo. El error se ignora aquí;
    quien llama a esta función decide si loguearlo.
    """
    contexto = {
        "usuario": usuario,
        "password_plano": password_plano,
        "login_url": f"{settings.FRONTEND_URL}/login",
    }

    mensaje_html = render_to_string("usuarios/email_bienvenida.html", contexto)
    mensaje_texto = render_to_string("usuarios/email_bienvenida.txt", contexto)

    send_mail(
        subject="¡Bienvenido/a a SIGRA! 🌱 Tus credenciales de acceso",
        message=mensaje_texto,
        from_email=None,  # usa DEFAULT_FROM_EMAIL
        recipient_list=[usuario.email],
        html_message=mensaje_html,
        fail_silently=False,
    )


def enviar_codigo_verificacion(usuario, codigo: str) -> None:
    """
    Envía el correo con el código de 6 dígitos del flujo de
    "olvidé mi contraseña". Mismo diseño de marca que el correo
    de bienvenida, en su propio par de plantillas.
    """
    contexto = {
        "usuario": usuario,
        "codigo": codigo,
        "minutos_vigencia": settings.CODIGO_RESTABLECIMIENTO_MINUTOS,
    }

    mensaje_html = render_to_string("usuarios/email_codigo.html", contexto)
    mensaje_texto = render_to_string("usuarios/email_codigo.txt", contexto)

    send_mail(
        subject="Tu código de restablecimiento — SIGRA 🌱",
        message=mensaje_texto,
        from_email=None,  # usa DEFAULT_FROM_EMAIL
        recipient_list=[usuario.email],
        html_message=mensaje_html,
        fail_silently=False,
    )
