from rest_framework import viewsets

from .models import (
    Amenaza,
    AmenazaCultivo,
    Cultivo,
    Categoria,
    CultivoTipoSuelo,
    CultivoUsuario,
    Estado,
    Especificacion,
    SeguimientoCultivo,
    TipoAmenaza,
    TipoSuelo,
)
from .serializers import (
    CultivoSerializer,
    CategoriaSerializer,
    EspecificacionSerializer,
    SeguimientoCultivoSerializer,
    AmenazaSerializer,
    TipoAmenazaSerializer,
    EstadoSerializer,
    CultivoUsuarioSerializer,
    CultivoTipoSueloSerializer,
    TipoSueloSerializer,
    AmenazaCultivoSerializer,
)


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class CultivoViewSet(viewsets.ModelViewSet):
    queryset = Cultivo.objects.all()
    serializer_class = CultivoSerializer


class EspecificacionViewSet(viewsets.ModelViewSet):
    queryset = Especificacion.objects.all()
    serializer_class = EspecificacionSerializer


class SeguimientoCultivoViewSet(viewsets.ModelViewSet):
    queryset = SeguimientoCultivo.objects.all()
    serializer_class = SeguimientoCultivoSerializer


class AmenazaViewSet(viewsets.ModelViewSet):
    queryset = Amenaza.objects.all()
    serializer_class = AmenazaSerializer


class TipoAmenazaViewSet(viewsets.ModelViewSet):
    queryset = TipoAmenaza.objects.all()
    serializer_class = TipoAmenazaSerializer


class EstadoViewSet(viewsets.ModelViewSet):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer


class CultivoUsuarioViewSet(viewsets.ModelViewSet):
    queryset = CultivoUsuario.objects.all()
    serializer_class = CultivoUsuarioSerializer


class CultivoTipoSueloViewSet(viewsets.ModelViewSet):
    queryset = CultivoTipoSuelo.objects.all()
    serializer_class = CultivoTipoSueloSerializer


class TipoSueloViewSet(viewsets.ModelViewSet):
    queryset = TipoSuelo.objects.all()
    serializer_class = TipoSueloSerializer


class AmenazaCultivoViewSet(viewsets.ModelViewSet):
    queryset = AmenazaCultivo.objects.all()
    serializer_class = AmenazaCultivoSerializer
