import re
from apps.usuarios.models import Usuario


def limpiar_texto(texto):
    texto = texto.strip().lower()

    reemplazos = {
        "á": "a",
        "é": "e",
        "í": "i",
        "ó": "o",
        "ú": "u",
        "ñ": "n",
    }

    for viejo, nuevo in reemplazos.items():
        texto = texto.replace(viejo, nuevo)

    return re.sub(r"[^a-z]", "", texto)


def generar_username(nombres, apellidos):

    primer_nombre = limpiar_texto(nombres.split()[0]) if nombres else ""

    primer_apellido = limpiar_texto(apellidos.split()[0]) if apellidos else ""

    base = f"{primer_nombre[:1]}{primer_apellido}"

    username = base
    contador = 1

    while Usuario.objects.filter(username=username).exists():
        username = f"{base}{contador}"
        contador += 1

    return username


def validar_cedula_ec(cedula: str) -> bool:
    if not cedula or len(cedula) != 10 or not cedula.isdigit():
        return False

    provincia = int(cedula[:2])

    if provincia < 1 or (provincia > 24 and provincia != 30):
        return False

    coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2]

    total = 0

    for i, coef in enumerate(coeficientes):
        valor = int(cedula[i]) * coef

        if valor >= 10:
            valor -= 9

        total += valor

    verificador = (10 - (total % 10)) % 10

    return verificador == int(cedula[9])
