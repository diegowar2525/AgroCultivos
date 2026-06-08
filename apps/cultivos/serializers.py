from rest_framework import serializers
from .models import (
    Cultivo,
    Categoria,
    Requerimiento,
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
    class Meta:
        model = Cultivo
        fields = "__all__"


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = "__all__"


class RequerimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requerimiento
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
    class Meta:
        model = CultivoUsuario
        fields = "__all__"


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
