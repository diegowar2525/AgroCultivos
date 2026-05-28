from rest_framework import serializers
from .models import Ubicacion, Provincia, Canton, Parroquia
#from .models import CondicionClimatica

class ProvinciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provincia
        fields = "__all__"


class CantonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Canton
        fields = "__all__"


class ParroquiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parroquia
        fields = "__all__"


class UbicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ubicacion
        fields = "__all__"
