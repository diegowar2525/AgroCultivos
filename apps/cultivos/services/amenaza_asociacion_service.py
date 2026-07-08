from apps.cultivos.models import Amenaza, AmenazaCultivo, Cultivo, TipoAmenaza


ALIAS_CULTIVOS = {
    "Tomate": ["Tomate", "Tomate riñón"],
    "Papa": ["Papa"],
    "Maíz": ["Maíz", "Choclo"],
    "Pimiento": ["Pimiento", "Pimiento morrón"],
}


def buscar_cultivo_por_nombre(nombre_cultivo):
    nombres_posibles = ALIAS_CULTIVOS.get(nombre_cultivo, [nombre_cultivo])

    for nombre in nombres_posibles:
        cultivo = Cultivo.objects.filter(nombre__iexact=nombre).first()
        if cultivo:
            return cultivo

    return None


def obtener_o_crear_tipo_amenaza(nombre_tipo):
    if not nombre_tipo:
        return None

    tipo_amenaza, _ = TipoAmenaza.objects.get_or_create(
        nombre__iexact=nombre_tipo,
        defaults={"nombre": nombre_tipo},
    )

    return tipo_amenaza


def obtener_o_crear_amenaza(nombre_amenaza, tipo_amenaza):
    if not nombre_amenaza:
        return None

    amenaza, creada = Amenaza.objects.get_or_create(
        nombre__iexact=nombre_amenaza,
        defaults={
            "nombre": nombre_amenaza,
            "descripcion": f"Amenaza detectada mediante modelo de imagen: {nombre_amenaza}",
            "tipo_amenaza": tipo_amenaza,
        },
    )

    if tipo_amenaza and amenaza.tipo_amenaza_id != tipo_amenaza.id:
        amenaza.tipo_amenaza = tipo_amenaza
        amenaza.save(update_fields=["tipo_amenaza"])

    return amenaza


def asociar_amenaza_con_cultivo(cultivo, amenaza, confianza):
    if not cultivo or not amenaza:
        return None

    relacion, creada = AmenazaCultivo.objects.get_or_create(
        cultivo=cultivo,
        amenaza=amenaza,
        defaults={
            "nivel_riesgo": confianza,
        },
    )

    if not creada and confianza > relacion.nivel_riesgo:
        relacion.nivel_riesgo = confianza
        relacion.save(update_fields=["nivel_riesgo"])

    return relacion


def asociar_prediccion_con_bd(resultado_prediccion):
    nombre_cultivo = resultado_prediccion.get("cultivo")
    nombre_amenaza = resultado_prediccion.get("amenaza")
    nombre_tipo_amenaza = resultado_prediccion.get("tipo_amenaza")
    estado = resultado_prediccion.get("estado")
    confianza = resultado_prediccion.get("confianza", 0)

    cultivo = buscar_cultivo_por_nombre(nombre_cultivo)

    tipo_amenaza = obtener_o_crear_tipo_amenaza(nombre_tipo_amenaza or "Ninguna")

    if estado == "Sano":
        amenaza = obtener_o_crear_amenaza("Sin amenaza detectada", tipo_amenaza)
    else:
        amenaza = obtener_o_crear_amenaza(nombre_amenaza, tipo_amenaza)

    relacion = asociar_amenaza_con_cultivo(cultivo, amenaza, confianza)

    return {
        "cultivo": cultivo,
        "amenaza": amenaza,
        "tipo_amenaza": tipo_amenaza,
        "amenaza_cultivo": relacion,
    }
