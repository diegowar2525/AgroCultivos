from django.contrib.auth import authenticate
from ..models import Usuario


def autenticar_usuario(identificador, password):

    usuario = None

    if identificador.isdigit() and len(identificador) == 10:
        try:
            obj = Usuario.objects.get(email=identificador)

        except (Usuario.DoesNotExist, Usuario.MultipleObjectsReturned):
            return None

    elif "@" in identificador:
        try:
            obj = Usuario.objects.get(email=identificador)

            usuario = authenticate(username=obj.username, password=password)

        except Usuario.DoesNotExist:
            pass

    else:
        usuario = authenticate(username=identificador, password=password)

    return usuario
