from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Consulta, ResultadoConsulta
from .serializers import (
    ConsultaSerializer,
    ResultadoConsultaSerializer,
)

from .services.recommendation_service import generar_recomendacion_geo


class ConsultaViewSet(viewsets.ModelViewSet):
    queryset = Consulta.objects.all()  # usado por el router para el basename; el filtro real está en get_queryset()
    serializer_class = ConsultaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # El staff ve todas las consultas (resumen del sistema); un usuario
        # normal solo debe ver las suyas, nunca las de todos.
        if self.request.user.is_staff:
            return Consulta.objects.all()
        return Consulta.objects.filter(usuario=self.request.user)

class ResultadoConsultaViewSet(viewsets.ModelViewSet):
    queryset = ResultadoConsulta.objects.all()
    serializer_class = ResultadoConsultaSerializer


class RecomendarGeoView(APIView):
    """
    POST /api/recomendaciones/recomendar-geo/

    Body:
    {
        "latitud": -2.1333,
        "longitud": -79.5833,
        "top_n": 10,
        "espacio": "Ambos",
        "ciclo": "corto"
    }
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            respuesta = generar_recomendacion_geo(
                usuario=request.user,
                latitud=request.data.get("latitud"),
                longitud=request.data.get("longitud"),
                top_n=request.data.get("top_n", 10),
                espacio=request.data.get("espacio"),
                ciclo=request.data.get("ciclo"),
            )
            return Response(respuesta, status=status.HTTP_200_OK)

        except ValueError as error:
            return Response(
                {"error": str(error)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except LookupError as error:
            return Response(
                {"error": str(error)},
                status=status.HTTP_404_NOT_FOUND,
            )

        except RuntimeError as error:
            return Response(
                {"error": str(error)},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
