from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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

    def get_queryset(self):
        queryset = Especificacion.objects.all()
        cultivo_id = self.request.query_params.get("cultivo")
        if cultivo_id is not None:
            queryset = queryset.filter(cultivo_id=cultivo_id)
        return queryset


class SeguimientoCultivoViewSet(viewsets.ModelViewSet):
    queryset = SeguimientoCultivo.objects.all()  # usado por el router para el basename; el filtro real está en get_queryset()
    serializer_class = SeguimientoCultivoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Cada usuario solo debe ver/editar seguimientos de SUS PROPIOS
        # cultivos, no los de todos los demás usuarios.
        return SeguimientoCultivo.objects.filter(
            cultivo_usuario__usuario=self.request.user
        )

    def perform_create(self, serializer):
        # Evita que alguien registre un seguimiento sobre el cultivo de
        # OTRO usuario adivinando el id de "cultivo_usuario" en el payload.
        cultivo_usuario = serializer.validated_data.get("cultivo_usuario")
        if cultivo_usuario and cultivo_usuario.usuario_id != self.request.user.id:
            raise PermissionDenied("No puedes registrar seguimiento sobre un cultivo que no es tuyo.")
        serializer.save()


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
    queryset = CultivoUsuario.objects.all()  # usado por el router para el basename; el filtro real está en get_queryset()
    serializer_class = CultivoUsuarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        usuario_id = self.request.query_params.get("usuario")

        if self.request.user.is_staff:
            if usuario_id is not None:
                # Actividad de un usuario específico (panel "Actividad de usuarios").
                queryset = CultivoUsuario.objects.filter(usuario_id=usuario_id)
            else:
                # Sin filtro: resumen agregado de todos los usuarios (dashboard).
                queryset = CultivoUsuario.objects.all()
        else:
            # Cualquier usuario normal solo ve sus propios cultivos, nunca los de todos.
            queryset = CultivoUsuario.objects.filter(usuario=self.request.user)

        iniciado = self.request.query_params.get("iniciado")
        if iniciado is not None:
            queryset = queryset.filter(iniciado=iniciado.lower() == "true")

        return queryset

    def perform_create(self, serializer):
        # Si el cliente no mandó un estado (ej. al guardar una recomendación
        # desde /recommendations), se le asigna un estado inicial por defecto.
        if "estado" not in serializer.validated_data:
            estado_inicial, _ = Estado.objects.get_or_create(nombre="Activo")
            serializer.save(usuario=self.request.user, estado=estado_inicial)
        else:
            serializer.save(usuario=self.request.user)

    @action(detail=True, methods=["post"])
    def iniciar(self, request, pk=None):
        """POST /api/cultivos/cultivo-usuario/{id}/iniciar/ — pasa el cultivo a seguimiento activo."""
        cultivo_usuario = self.get_object()
        cultivo_usuario.iniciado = True
        cultivo_usuario.save()
        return Response(self.get_serializer(cultivo_usuario).data)


class CultivoTipoSueloViewSet(viewsets.ModelViewSet):
    queryset = CultivoTipoSuelo.objects.all()
    serializer_class = CultivoTipoSueloSerializer


class TipoSueloViewSet(viewsets.ModelViewSet):
    queryset = TipoSuelo.objects.all()
    serializer_class = TipoSueloSerializer


class AmenazaCultivoViewSet(viewsets.ModelViewSet):
    queryset = AmenazaCultivo.objects.all()
    serializer_class = AmenazaCultivoSerializer