"""
Management command para poblar la base de datos con datos de ejemplo.

Ubicación sugerida:
    apps/agroclima/management/commands/poblar_bd.py

Archivo JSON esperado:
    apps/agroclima/management/data/info_cultivos_organizado.json

Uso:
    python manage.py poblar_bd
    python manage.py poblar_bd --borrar
"""

from decimal import Decimal
from datetime import date, timedelta
from pathlib import Path
import json
import random
import re

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction

from apps.agroclima.models import (
    Provincia,
    Canton,
    Parroquia,
    Ubicacion,
    CondicionClimatica,
)

from apps.cultivos.models import (
    TipoSuelo,
    TipoAmenaza,
    Categoria,
    Estado,
    Amenaza,
    Cultivo,
    Especificacion,
    AmenazaCultivo,
    CultivoTipoSuelo,
    CultivoUsuario,
    SeguimientoCultivo,
)


User = get_user_model()

JSON_PATH = (
    Path(__file__).resolve().parents[1] / "data" / "info_cultivos.json"
)


DESCRIPCIONES_CATEGORIA = {
    "Tubérculos": "Cultivos de raíz, tubérculo o estructura subterránea comestible.",
    "Cereales": "Cultivos aprovechados principalmente por su grano.",
    "Leguminosas": "Cultivos ricos en proteína y asociados a la fijación de nitrógeno.",
    "Hortalizas": "Cultivos vegetales de consumo fresco o ciclo relativamente corto.",
    "Frutales": "Cultivos destinados principalmente a la producción de frutos.",
    "Hierbas aromáticas": "Plantas utilizadas como condimento, infusión o aromática.",
    "Oleaginosas": "Cultivos aprovechados por su contenido de aceite o semillas.",
}


class Command(BaseCommand):
    help = "Puebla la base de datos usando info_cultivos_organizado.json como fuente principal."

    def add_arguments(self, parser):
        parser.add_argument(
            "--borrar",
            action="store_true",
            help="Borra los datos existentes antes de poblar.",
        )

    def handle(self, *args, **options):
        cultivos_json = self.cargar_cultivos_json()

        if options["borrar"]:
            self.borrar_datos()

        with transaction.atomic():
            usuario = self.crear_usuario_demo()
            ubicaciones = self.crear_geografia()
            self.crear_condiciones_climaticas(ubicaciones)

            tipos_suelo = self.crear_tipos_suelo()
            tipos_amenaza = self.crear_tipos_amenaza()
            categorias = self.crear_categorias(cultivos_json)
            estados = self.crear_estados()
            amenazas = self.crear_amenazas(tipos_amenaza)

            cultivos = self.crear_cultivos(cultivos_json, categorias)
            self.crear_especificaciones(cultivos, cultivos_json)
            self.crear_amenaza_cultivo(cultivos, amenazas)
            self.crear_cultivo_tipo_suelo(cultivos, tipos_suelo)
            self.crear_seguimientos(usuario, cultivos, estados)

        self.stdout.write(self.style.SUCCESS("Base de datos poblada correctamente."))

    # ------------------------------------------------------------------ #
    # Carga de JSON
    # ------------------------------------------------------------------ #
    def cargar_cultivos_json(self):
        if not JSON_PATH.exists():
            raise FileNotFoundError(
                f"No se encontró el archivo JSON en la ruta esperada: {JSON_PATH}"
            )

        with open(JSON_PATH, "r", encoding="utf-8") as archivo:
            cultivos = json.load(archivo)

        campos_obligatorios = [
            "categoria",
            "descripcion",
            "temp_min",
            "temp_max",
            "humedad_min",
            "humedad_max",
            "precip_min",
            "precip_max",
            "rad_min",
            "rad_max",
            "altitud_min",
            "altitud_max",
            "tipo_siembra",
            "ciclo",
        ]

        for nombre, datos in cultivos.items():
            faltantes = [campo for campo in campos_obligatorios if campo not in datos]
            if faltantes:
                raise ValueError(
                    f"El cultivo '{nombre}' no tiene estos campos en el JSON: {faltantes}"
                )

        return cultivos

    # ------------------------------------------------------------------ #
    # Limpieza
    # ------------------------------------------------------------------ #
    def borrar_datos(self):
        self.stdout.write("Borrando datos existentes...")

        SeguimientoCultivo.objects.all().delete()
        CultivoUsuario.objects.all().delete()
        AmenazaCultivo.objects.all().delete()
        CultivoTipoSuelo.objects.all().delete()
        Especificacion.objects.all().delete()
        Cultivo.objects.all().delete()
        Amenaza.objects.all().delete()
        Categoria.objects.all().delete()
        Estado.objects.all().delete()
        TipoAmenaza.objects.all().delete()
        TipoSuelo.objects.all().delete()
        CondicionClimatica.objects.all().delete()
        Ubicacion.objects.all().delete()
        Parroquia.objects.all().delete()
        Canton.objects.all().delete()
        Provincia.objects.all().delete()

    # ------------------------------------------------------------------ #
    # Usuario demo
    # ------------------------------------------------------------------ #
    def crear_usuario_demo(self):
        usuario, creado = User.objects.get_or_create(
            username="agricultor_demo",
            defaults={"email": "agricultor_demo@example.com"},
        )

        if creado:
            usuario.set_password("agricultor123")
            usuario.save()
            self.stdout.write("Usuario demo creado: agricultor_demo / agricultor123")

        return usuario

    # ------------------------------------------------------------------ #
    # Geografía
    # ------------------------------------------------------------------ #
    def crear_geografia(self):
        self.stdout.write("Creando geografía...")

        estructura = {
            "Pichincha": {
                "Quito": ["Cumbayá", "Tumbaco", "Conocoto", "Puembo"],
                "Cayambe": ["Cayambe", "Ayora", "Ascázubi"],
                "Mejía": ["Machachi", "Aloasí"],
            },
            "Imbabura": {
                "Otavalo": ["Otavalo", "San Rafael"],
                "Ibarra": ["Ibarra", "San Antonio"],
            },
            "Cotopaxi": {
                "Latacunga": ["Latacunga", "Tanicuchí"],
                "Salcedo": ["Salcedo", "Mulalillo"],
            },
            "Tungurahua": {
                "Ambato": ["Ambato", "Izamba", "Picaihua"],
            },
            "Chimborazo": {
                "Riobamba": ["Riobamba", "Cacha", "Licán"],
            },
            "Guayas": {
                "Milagro": ["Milagro", "Mariscal Sucre"],
                "Guayaquil": ["Tarqui", "Ximena"],
            },
            "Los Ríos": {
                "Babahoyo": ["Babahoyo", "Pimocha"],
            },
            "Manabí": {
                "Portoviejo": ["Portoviejo", "Riochico"],
            },
        }

        ubicaciones = []

        coordenadas_base = {
            "Pichincha": (-0.18, -78.47, 2850),
            "Imbabura": (0.35, -78.12, 2500),
            "Cotopaxi": (-0.93, -78.61, 2800),
            "Tungurahua": (-1.24, -78.62, 2600),
            "Chimborazo": (-1.67, -78.65, 2750),
            "Guayas": (-2.13, -79.59, 35),
            "Los Ríos": (-1.80, -79.53, 20),
            "Manabí": (-1.05, -80.45, 60),
        }

        for provincia_nombre, cantones in estructura.items():
            provincia, _ = Provincia.objects.get_or_create(nombre=provincia_nombre)
            lat_base, lon_base, alt_base = coordenadas_base[provincia_nombre]

            for canton_nombre, parroquias in cantones.items():
                canton, _ = Canton.objects.get_or_create(
                    provincia=provincia,
                    nombre=canton_nombre,
                )

                for parroquia_nombre in parroquias:
                    parroquia, _ = Parroquia.objects.get_or_create(
                        canton=canton,
                        nombre=parroquia_nombre,
                    )

                    ubicacion = Ubicacion.objects.create(
                        parroquia=parroquia,
                        latitud=Decimal(
                            str(round(lat_base + random.uniform(-0.08, 0.08), 6))
                        ),
                        longitud=Decimal(
                            str(round(lon_base + random.uniform(-0.08, 0.08), 6))
                        ),
                        altitud=round(max(0, alt_base + random.uniform(-250, 250)), 1),
                    )

                    ubicaciones.append(ubicacion)

        return ubicaciones

    # ------------------------------------------------------------------ #
    # Condiciones climáticas
    # ------------------------------------------------------------------ #
    def crear_condiciones_climaticas(self, ubicaciones):
        self.stdout.write("Creando condiciones climáticas...")

        for ubicacion in ubicaciones:
            altitud = float(ubicacion.altitud)

            if altitud >= 1800:
                temp_min, temp_max = 8, 22
                precip_min, precip_max = 500, 1300
                rad_min, rad_max = 12, 22
            else:
                temp_min, temp_max = 22, 35
                precip_min, precip_max = 400, 1800
                rad_min, rad_max = 16, 28

            for _ in range(5):
                CondicionClimatica.objects.create(
                    ubicacion=ubicacion,
                    temperatura_promedio=round(random.uniform(temp_min, temp_max), 1),
                    humedad=round(random.uniform(50, 90), 1),
                    precipitacion=round(random.uniform(precip_min, precip_max), 1),
                    radiacion_solar=round(random.uniform(rad_min, rad_max), 1),
                )

    # ------------------------------------------------------------------ #
    # Catálogos
    # ------------------------------------------------------------------ #
    def crear_tipos_suelo(self):
        self.stdout.write("Creando tipos de suelo...")

        datos = [
            ("Franco", "Suelo equilibrado en arena, limo y arcilla, con buen drenaje."),
            ("Arcilloso", "Suelo de alta retención de agua y drenaje lento."),
            ("Arenoso", "Suelo de drenaje rápido y baja retención de nutrientes."),
            (
                "Franco-arcilloso",
                "Suelo con equilibrio entre drenaje y retención de agua.",
            ),
            (
                "Volcánico (Andisol)",
                "Suelo rico en materia orgánica, típico de zonas andinas.",
            ),
        ]

        return [
            TipoSuelo.objects.get_or_create(
                nombre=nombre,
                defaults={"descripcion": descripcion},
            )[0]
            for nombre, descripcion in datos
        ]

    def crear_tipos_amenaza(self):
        self.stdout.write("Creando tipos de amenaza...")

        nombres = ["Plaga", "Enfermedad", "Fenómeno climático", "Maleza"]

        return [
            TipoAmenaza.objects.get_or_create(nombre=nombre)[0] for nombre in nombres
        ]

    def crear_categorias(self, cultivos_json):
        self.stdout.write("Creando categorías...")

        nombres = sorted({datos["categoria"] for datos in cultivos_json.values()})
        categorias = {}

        for nombre in nombres:
            categoria, _ = Categoria.objects.get_or_create(
                nombre=nombre,
                defaults={
                    "descripcion": DESCRIPCIONES_CATEGORIA.get(
                        nombre,
                        f"Categoría agrícola: {nombre}.",
                    )
                },
            )
            categorias[nombre] = categoria

        return categorias

    def crear_estados(self):
        self.stdout.write("Creando estados...")

        nombres = ["Sembrado", "En crecimiento", "En floración", "Cosechado", "Perdido"]

        return [Estado.objects.get_or_create(nombre=nombre)[0] for nombre in nombres]

    def crear_amenazas(self, tipos_amenaza):
        self.stdout.write("Creando amenazas...")

        por_tipo = {tipo.nombre: tipo for tipo in tipos_amenaza}

        datos = [
            (
                "Gusano blanco de la papa",
                "Larva que perfora tubérculos y afecta el rendimiento.",
                "Plaga",
            ),
            (
                "Tizón tardío",
                "Enfermedad que afecta hojas, tallos y frutos en condiciones húmedas.",
                "Enfermedad",
            ),
            (
                "Pulgón",
                "Insecto chupador que debilita la planta y puede transmitir virus.",
                "Plaga",
            ),
            (
                "Roya del maíz",
                "Enfermedad fúngica que produce manchas o pústulas en hojas.",
                "Enfermedad",
            ),
            (
                "Helada",
                "Descenso brusco de temperatura que puede dañar tejidos vegetales.",
                "Fenómeno climático",
            ),
            (
                "Sequía",
                "Déficit prolongado de precipitación o humedad disponible.",
                "Fenómeno climático",
            ),
            (
                "Mosca blanca",
                "Insecto que afecta hortalizas y puede transmitir enfermedades virales.",
                "Plaga",
            ),
            ("Kikuyo", "Maleza invasora de rápido crecimiento.", "Maleza"),
        ]

        amenazas = []

        for nombre, descripcion, tipo_nombre in datos:
            amenaza, _ = Amenaza.objects.get_or_create(
                nombre=nombre,
                defaults={
                    "descripcion": descripcion,
                    "tipo_amenaza": por_tipo[tipo_nombre],
                },
            )
            amenazas.append(amenaza)

        return amenazas

    # ------------------------------------------------------------------ #
    # Cultivos y especificaciones
    # ------------------------------------------------------------------ #
    def crear_cultivos(self, cultivos_json, categorias):
        self.stdout.write("Creando cultivos desde JSON...")

        cultivos = []

        for nombre, datos in cultivos_json.items():
            categoria_nombre = datos["categoria"]
            tiempo_cosecha = self.ciclo_a_dias(datos["ciclo"])

            cultivo, creado = Cultivo.objects.get_or_create(
                nombre=nombre,
                defaults={
                    "categoria": categorias[categoria_nombre],
                    "descripcion": datos["descripcion"],
                    "tiempo_cosecha": tiempo_cosecha,
                    "activo": True,
                },
            )

            if not creado:
                cultivo.categoria = categorias[categoria_nombre]
                cultivo.descripcion = datos["descripcion"]
                cultivo.tiempo_cosecha = tiempo_cosecha
                cultivo.activo = True
                cultivo.save()

            cultivos.append(cultivo)

        return cultivos

    def crear_especificaciones(self, cultivos, cultivos_json):
        self.stdout.write("Creando especificaciones agroclimáticas desde JSON...")

        for cultivo in cultivos:
            datos = cultivos_json.get(cultivo.nombre)

            if not datos:
                continue

            especificacion, creado = Especificacion.objects.get_or_create(
                cultivo=cultivo,
                defaults={
                    "altitud_min": datos["altitud_min"],
                    "altitud_max": datos["altitud_max"],
                    "horas_sol": self.radiacion_a_horas_sol(
                        datos["rad_min"], datos["rad_max"]
                    ),
                    "humedad_min": datos["humedad_min"],
                    "humedad_max": datos["humedad_max"],
                    "precipitacion_min": datos["precip_min"],
                    "precipitacion_max": datos["precip_max"],
                    "temperatura_min": datos["temp_min"],
                    "temperatura_max": datos["temp_max"],
                    "radiacion_min": datos["rad_min"],
                    "radiacion_max": datos["rad_max"],
                },
            )

            if not creado:
                especificacion.altitud_min = datos["altitud_min"]
                especificacion.altitud_max = datos["altitud_max"]
                especificacion.horas_sol = self.radiacion_a_horas_sol(
                    datos["rad_min"],
                    datos["rad_max"],
                )
                especificacion.humedad_min = datos["humedad_min"]
                especificacion.humedad_max = datos["humedad_max"]
                especificacion.precipitacion_min = datos["precip_min"]
                especificacion.precipitacion_max = datos["precip_max"]
                especificacion.temperatura_min = datos["temp_min"]
                especificacion.temperatura_max = datos["temp_max"]
                especificacion.radiacion_min = datos["rad_min"]
                especificacion.radiacion_max = datos["rad_max"]
                especificacion.save()

    # ------------------------------------------------------------------ #
    # Relaciones
    # ------------------------------------------------------------------ #
    def crear_amenaza_cultivo(self, cultivos, amenazas):
        self.stdout.write("Relacionando amenazas con cultivos...")

        por_cultivo = {cultivo.nombre: cultivo for cultivo in cultivos}
        por_amenaza = {amenaza.nombre: amenaza for amenaza in amenazas}

        relaciones = [
            ("Papa", "Gusano blanco de la papa", 0.8),
            ("Papa", "Tizón tardío", 0.9),
            ("Papa", "Helada", 0.6),
            ("Maíz suave", "Roya del maíz", 0.5),
            ("Maíz suave", "Sequía", 0.6),
            ("Maíz duro", "Roya del maíz", 0.5),
            ("Maíz duro", "Sequía", 0.6),
            ("Choclo", "Roya del maíz", 0.5),
            ("Choclo", "Sequía", 0.6),
            ("Quinua", "Pulgón", 0.4),
            ("Quinua", "Helada", 0.5),
            ("Fréjol", "Mosca blanca", 0.5),
            ("Haba", "Pulgón", 0.6),
            ("Haba", "Helada", 0.7),
            ("Arveja", "Pulgón", 0.5),
            ("Vainita", "Mosca blanca", 0.5),
            ("Brócoli", "Mosca blanca", 0.6),
            ("Brócoli", "Kikuyo", 0.3),
            ("Cebolla paiteña", "Kikuyo", 0.4),
            ("Cebolla de bulbo", "Kikuyo", 0.4),
            ("Tomate riñón", "Mosca blanca", 0.6),
            ("Pimiento", "Mosca blanca", 0.5),
            ("Tomate de árbol", "Mosca blanca", 0.5),
            ("Mora de castilla", "Sequía", 0.4),
            ("Fresa", "Pulgón", 0.4),
        ]

        for cultivo_nombre, amenaza_nombre, riesgo in relaciones:
            cultivo = por_cultivo.get(cultivo_nombre)
            amenaza = por_amenaza.get(amenaza_nombre)

            if not cultivo or not amenaza:
                continue

            AmenazaCultivo.objects.get_or_create(
                cultivo=cultivo,
                amenaza=amenaza,
                defaults={"nivel_riesgo": riesgo},
            )

    def crear_cultivo_tipo_suelo(self, cultivos, tipos_suelo):
        self.stdout.write("Relacionando cultivos con tipos de suelo...")

        suelos = {suelo.nombre: suelo for suelo in tipos_suelo}

        for cultivo in cultivos:
            categoria = cultivo.categoria.nombre
            nombre = cultivo.nombre

            suelo_principal = self.suelo_principal_por_categoria(categoria)

            CultivoTipoSuelo.objects.get_or_create(
                cultivo=cultivo,
                tipo_suelo=suelos[suelo_principal],
            )

            if categoria in ["Tubérculos", "Cereales"] or nombre in [
                "Tomate de árbol",
                "Mora de castilla",
                "Babaco",
                "Uvilla",
            ]:
                CultivoTipoSuelo.objects.get_or_create(
                    cultivo=cultivo,
                    tipo_suelo=suelos["Volcánico (Andisol)"],
                )

    # ------------------------------------------------------------------ #
    # Cultivos del usuario + seguimientos
    # ------------------------------------------------------------------ #
    def crear_seguimientos(self, usuario, cultivos, estados):
        self.stdout.write("Creando cultivos del usuario y seguimientos...")

        por_estado = {estado.nombre: estado for estado in estados}
        hoy = date.today()
        muestras = random.sample(cultivos, k=min(4, len(cultivos)))

        for cultivo in muestras:
            fecha_siembra = hoy - timedelta(days=random.randint(20, 90))
            fecha_estimada = fecha_siembra + timedelta(days=cultivo.tiempo_cosecha)

            cultivo_usuario, creado = CultivoUsuario.objects.get_or_create(
                usuario=usuario,
                cultivo=cultivo,
                fecha_siembra=fecha_siembra,
                defaults={
                    "estado": por_estado["En crecimiento"],
                    "fecha_cosecha_estimada": fecha_estimada,
                },
            )

            if not creado:
                continue

            for i in range(3):
                SeguimientoCultivo.objects.create(
                    cultivo_usuario=cultivo_usuario,
                    altura_planta=round(random.uniform(5, 80), 1),
                    estado_fenologico=random.choice(
                        [
                            "Germinación",
                            "Crecimiento vegetativo",
                            "Floración",
                            "Fructificación",
                        ]
                    ),
                    observaciones=f"Seguimiento #{i + 1} generado automáticamente.",
                )

    # ------------------------------------------------------------------ #
    # Utilidades
    # ------------------------------------------------------------------ #
    def ciclo_a_dias(self, ciclo):
        numeros = [int(n) for n in re.findall(r"\d+", ciclo)]

        if not numeros:
            return 90

        meses_promedio = sum(numeros) / len(numeros)

        return int(round(meses_promedio * 30))

    def radiacion_a_horas_sol(self, rad_min, rad_max):
        promedio = (float(rad_min) + float(rad_max)) / 2

        if promedio < 14:
            return 5
        if promedio < 18:
            return 6
        if promedio < 22:
            return 7

        return 8

    def suelo_principal_por_categoria(self, categoria):
        if categoria == "Tubérculos":
            return "Franco"
        if categoria == "Cereales":
            return "Franco-arcilloso"
        if categoria == "Leguminosas":
            return "Franco"
        if categoria == "Frutales":
            return "Franco-arcilloso"
        if categoria == "Hierbas aromáticas":
            return "Franco"
        if categoria == "Oleaginosas":
            return "Franco"

        return "Franco"
