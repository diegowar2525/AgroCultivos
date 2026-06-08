from rest_framework import serializers
from .models import Consulta, ResultadoConsulta, TipoConsulta


class ConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = "__all__"


class ResultadoConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultadoConsulta
        fields = "__all__"


class TipoConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoConsulta
        fields = "__all__"
