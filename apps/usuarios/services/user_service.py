from ..models import Usuario
from ..utils import generar_username
from .email_service import enviar_bienvenida


def crear_usuario(data):

    password = data.pop("password")

    username = generar_username(data["first_name"], data["last_name"])

    usuario = Usuario.objects.create(username=username, **data)

    usuario.set_password(password)
    usuario.save()

    try:
        enviar_bienvenida(usuario, password)
    except Exception:
        # El registro ya se completó; un correo fallido no debe
        # impedir que la cuenta quede creada.
        pass

    return usuario

