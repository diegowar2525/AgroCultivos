from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.agroclima.models import CondicionClimatica
from apps.usuarios.models import Usuario

from .models import Consulta, ResultadoConsulta
from .serializers import (
    ConsultaSerializer,
    ResultadoConsultaSerializer,
)
from .services.crop_recommendation_service import recomendar_cultivos


class ConsultaViewSet(viewsets.ModelViewSet):
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer


class ResultadoConsultaViewSet(viewsets.ModelViewSet):
    queryset = ResultadoConsulta.objects.all()
    serializer_class = ResultadoConsultaSerializer


class ResultadoConsultaView(APIView):
    def post(self, request):

        ubicacion_id = request.data.get("ubicacion_id")

        if not ubicacion_id:
            return Response(
                {"error": "ubicacion_id es requerido"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        usuario = Usuario.objects.first()

        consulta = Consulta.objects.create(usuario=usuario, ubicacion_id=ubicacion_id)

        condicion = CondicionClimatica.objects.filter(ubicacion_id=ubicacion_id).latest(
            "fecha_registro"
        )

        resultados = recomendar_cultivos(consulta, condicion)

        data = [
            {
                "cultivo": r["resultado"].cultivo.nombre,
                "score": r["resultado"].puntaje_compatibilidad,
                "nivel": r["nivel"],
                "justificacion": r["resultado"].justificacion,
                "recomendado": r["resultado"].recomendado,
            }
            for r in resultados
        ]

        return Response(data)
