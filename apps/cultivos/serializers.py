from rest_framework import serializers
from .models import Cultivo, Categoria, Requerimiento


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
