from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser

from .services.amenaza_imagen_service import predecir_amenaza_desde_ruta
from .utils import construir_texto_prediccion


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
    queryset = SeguimientoCultivo.objects.all()
    serializer_class = SeguimientoCultivoSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return SeguimientoCultivo.objects.filter(
            cultivo_usuario__usuario=self.request.user
        )

    def perform_create(self, serializer):
        cultivo_usuario = serializer.validated_data.get("cultivo_usuario")

        if cultivo_usuario and cultivo_usuario.usuario_id != self.request.user.id:
            raise PermissionDenied(
                "No puedes registrar seguimiento sobre un cultivo que no es tuyo."
            )

        if cultivo_usuario and cultivo_usuario.estado.nombre == "Suspendido":
            raise PermissionDenied(
                "Este cultivo fue suspendido por un administrador. No puedes registrar seguimiento hasta que se reactive."
            )

        serializer.save()

    @action(
        detail=False,
        methods=["post"],
        url_path="predecir-amenaza",
        parser_classes=[MultiPartParser, FormParser],
    )
    def predecir_amenaza(self, request):
        """
        POST /api/cultivos/seguimientos/predecir-amenaza/

        Este endpoint solo analiza una imagen temporalmente.
        No crea SeguimientoCultivo.
        No guarda la imagen en la BD.

        form-data:
        imagen: archivo.jpg
        cultivo_usuario: opcional
        """

        imagen = request.FILES.get("imagen")
        cultivo_usuario_id = request.data.get("cultivo_usuario")

        if not imagen:
            return Response(
                {"imagen": "Debes enviar una imagen."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        cultivo_usuario = None

        if cultivo_usuario_id:
            try:
                cultivo_usuario = CultivoUsuario.objects.get(
                    id=cultivo_usuario_id,
                    usuario=request.user,
                )
            except CultivoUsuario.DoesNotExist:
                raise PermissionDenied(
                    "No puedes analizar una imagen para un cultivo que no es tuyo."
                )

        import tempfile
        import os

        extension = os.path.splitext(imagen.name)[1] or ".jpg"

        try:
            with tempfile.NamedTemporaryFile(
                delete=False, suffix=extension
            ) as archivo_temporal:
                for chunk in imagen.chunks():
                    archivo_temporal.write(chunk)

                ruta_temporal = archivo_temporal.name

            resultado_prediccion = predecir_amenaza_desde_ruta(
                ruta_temporal,
                top_n=5,
            )

            cultivo_bd = None
            cultivo_coincide = None

            if cultivo_usuario:
                cultivo_bd = cultivo_usuario.cultivo.nombre
                cultivo_detectado = resultado_prediccion.get("cultivo")

                cultivo_coincide = (
                    cultivo_detectado.lower() in cultivo_bd.lower()
                    or cultivo_bd.lower() in cultivo_detectado.lower()
                )

            return Response(
                {
                    "prediccion": resultado_prediccion,
                    "cultivo_usuario": {
                        "id": cultivo_usuario.id if cultivo_usuario else None,
                        "cultivo_bd": cultivo_bd,
                        "cultivo_coincide": cultivo_coincide,
                    },
                    "mensaje_observacion": construir_texto_prediccion(
                        resultado_prediccion
                    ),
                },
                status=status.HTTP_200_OK,
            )

        except Exception as error:
            return Response(
                {
                    "detail": "Ocurrió un error al analizar la imagen.",
                    "error": str(error),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        finally:
            if "ruta_temporal" in locals() and os.path.exists(ruta_temporal):
                os.remove(ruta_temporal)


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
    queryset = (
        CultivoUsuario.objects.all()
    )  # usado por el router para el basename; el filtro real está en get_queryset()
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
