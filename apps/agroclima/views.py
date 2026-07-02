from rest_framework import viewsets

from .models import CondicionClimatica, Provincia, Canton, Parroquia, Ubicacion

from .serializers import (
    ProvinciaSerializer,
    CantonSerializer,
    ParroquiaSerializer,
    UbicacionSerializer,
    CondicionClimaticaSerializer,
)


class ProvinciaViewSet(viewsets.ModelViewSet):
    queryset = Provincia.objects.all()
    serializer_class = ProvinciaSerializer


class CantonViewSet(viewsets.ModelViewSet):
    queryset = Canton.objects.all()
    serializer_class = CantonSerializer


class ParroquiaViewSet(viewsets.ModelViewSet):
    queryset = Parroquia.objects.all()
    serializer_class = ParroquiaSerializer


class UbicacionViewSet(viewsets.ModelViewSet):
    queryset = Ubicacion.objects.all()
    serializer_class = UbicacionSerializer


class CondicionClimaticaViewSet(viewsets.ModelViewSet):
    queryset = CondicionClimatica.objects.all()
    serializer_class = CondicionClimaticaSerializer
