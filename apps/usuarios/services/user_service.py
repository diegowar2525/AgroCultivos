from ..models import Usuario, Rol
from ..utils import generar_username


def crear_usuario(data):

    password = data.pop("password")

    username = generar_username(data["nombres"], data["apellidos"])

    rol_agricultor = Rol.objects.get(nombre="Agricultor")

    usuario = Usuario.objects.create(
        username=username,
        first_name=data["nombres"],
        last_name=data["apellidos"],
        rol=rol_agricultor,
        **data,
    )

    usuario.set_password(password)
    usuario.save()

    return usuario
