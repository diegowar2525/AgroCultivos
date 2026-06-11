from ..models import Usuario
from ..utils import generar_username


def crear_usuario(data):

    password = data.pop("password")

    username = generar_username(data["first_name"], data["last_name"])

    usuario = Usuario.objects.create(username=username, **data)

    usuario.set_password(password)
    usuario.save()

    return usuario
