from rest_framework import viewsets

from .models import Cultivo, Categoria, Requerimiento
from .serializers import CultivoSerializer, CategoriaSerializer, RequerimientoSerializer


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class CultivoViewSet(viewsets.ModelViewSet):
    queryset = Cultivo.objects.all()
    serializer_class = CultivoSerializer


class RequerimientoViewSet(viewsets.ModelViewSet):
    queryset = Requerimiento.objects.all()
    serializer_class = RequerimientoSerializer