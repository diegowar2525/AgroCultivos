from rest_framework import serializers
from .models import Cultivo, Categoria
# from .models import Requerimiento


class CultivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cultivo
        fields = "__all__"


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = "__all__"


# No se crea un serializer para Requerimiento porque no se va a exponer directamente
# a través de la API, sino que se manejará como parte de la lógica interna del cultivo.
