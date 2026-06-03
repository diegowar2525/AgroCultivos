from ..models import Usuario
from ..utils import generar_username


def crear_usuario(data):

    password = data.pop("password")

    username = generar_username(
        data["nombres"],
        data["apellidos"]
    )

    usuario = Usuario.objects.create(
        username=username,
        first_name=data["nombres"],
        last_name=data["apellidos"],
        **data
    )

    usuario.set_password(password)
    usuario.save()

    return usuario