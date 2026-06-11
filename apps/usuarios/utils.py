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

    apellidos_lista = apellidos.split() if apellidos else []

    primer_apellido = (
        limpiar_texto(apellidos_lista[0]) if len(apellidos_lista) > 0 else ""
    )

    inicial_segundo_apellido = (
        limpiar_texto(apellidos_lista[1])[0] if len(apellidos_lista) > 1 else ""
    )

    base = f"{primer_nombre[:1]}{primer_apellido}{inicial_segundo_apellido}"

    username = base
    contador = 1

    while Usuario.objects.filter(username=username).exists():
        username = f"{base}{contador}"
        contador += 1

    return username


def validar_cedula_ec(cedula: str) -> tuple[bool, str]:
    if not cedula or cedula.strip() == "":
        return False, "El campo de cédula no puede estar vacío."

    if not cedula.isdigit():
        return False, "La cédula solo debe contener números."

    if len(cedula) != 10:
        return False, "La cédula debe tener exactamente 10 dígitos."

    provincia = int(cedula[:2])

    if provincia < 1 or (provincia > 24 and provincia != 30):
        return False, "El código de provincia (los dos primeros dígitos) es inválido."

    coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2]
    total = 0

    for i, coef in enumerate(coeficientes):
        valor = int(cedula[i]) * coef
        if valor >= 10:
            valor -= 9
        total += valor

    verificador = (10 - (total % 10)) % 10

    if verificador != int(cedula[9]):
        return False, "El dígito verificador es incorrecto. Cédula no válida."

    return True, ""
