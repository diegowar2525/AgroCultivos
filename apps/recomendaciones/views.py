from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.agroclima.models import CondicionClimatica

from .models import Consulta
from .serializers import ConsultaSerializer
from .services.recomendar_cultivo_service import recomendar_cultivos


class ConsultaViewSet(viewsets.ModelViewSet):
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer


class ResultadoConsultaView(APIView):
    def post(self, request):

        ubicacion_id = request.data.get("ubicacion_id")

        if not ubicacion_id:
            return Response(
                {"error": "ubicacion_id es requerido"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        condicion = CondicionClimatica.objects.filter(ubicacion_id=ubicacion_id).latest(
            "fecha_registro"
        )

        resultados = recomendar_cultivos(condicion)

        data = [
            {"cultivo": r["cultivo"].nombre, "score": r["score"]} for r in resultados
        ]

        return Response(data)
