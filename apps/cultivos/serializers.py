from rest_framework import serializers
from .models import (
    Cultivo,
    Categoria,
    Especificacion,
    SeguimientoCultivo,
    Amenaza,
    TipoAmenaza,
    Estado,
    CultivoUsuario,
    CultivoTipoSuelo,
    TipoSuelo,
    AmenazaCultivo,
)


class CultivoSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.CharField(source="categoria.nombre", read_only=True)

    class Meta:
        model = Cultivo
        fields = "__all__"


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = "__all__"


class EspecificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especificacion
        fields = "__all__"


class SeguimientoCultivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeguimientoCultivo
        fields = "__all__"


class AmenazaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenaza
        fields = "__all__"


class TipoAmenazaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoAmenaza
        fields = "__all__"


class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = "__all__"


class CultivoUsuarioSerializer(serializers.ModelSerializer):
    cultivo_nombre = serializers.CharField(source="cultivo.nombre", read_only=True)
    cultivo_imagen = serializers.ImageField(source="cultivo.imagen", read_only=True)
    estado_nombre = serializers.CharField(source="estado.nombre", read_only=True)

    class Meta:
        model = CultivoUsuario
        fields = "__all__"
        extra_kwargs = {
            # El usuario se toma del token de autenticación, no del payload.
            "usuario": {"required": False},
            # Si no se manda un estado explícito, el backend le asigna uno por defecto.
            "estado": {"required": False},
        }


class CultivoTipoSueloSerializer(serializers.ModelSerializer):
    class Meta:
        model = CultivoTipoSuelo
        fields = "__all__"


class TipoSueloSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoSuelo
        fields = "__all__"


class AmenazaCultivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AmenazaCultivo
        fields = "__all__"
