from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from .serializers import RegistroSerializer, LoginSerializer, PerfilSerializer, UsuarioAdminSerializer
from .services.auth_service import autenticar_usuario
from .services.user_service import crear_usuario
from .services.password_reset_service import (
    solicitar_codigo,
    verificar_codigo,
    cambiar_password,
)
from .models import Usuario


class RegistroView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        serializer = RegistroSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        data.pop("confirmar_password")

        usuario = crear_usuario(data)

        token, _ = Token.objects.get_or_create(user=usuario)

        return Response(
            {"token": token.key, "username": usuario.username},
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        usuario = autenticar_usuario(
            serializer.validated_data["identificador"],
            serializer.validated_data["password"],
        )

        if not usuario:
            return Response({"detail": "Credenciales incorrectas"}, status=400)

        token, _ = Token.objects.get_or_create(user=usuario)

        return Response({"token": token.key, "usuario": usuario.username})


class PerfilView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = PerfilSerializer(request.user)

        return Response(serializer.data)

    def put(self, request):

        serializer = PerfilSerializer(request.user, data=request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data)
    
    def delete(self, request):
        """Elimina la cuenta del usuario autenticado (acción irreversible)."""
        request.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UsuarioAdminViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioAdminSerializer
    permission_classes = [IsAdminUser]


class SolicitarCodigoView(APIView):
    """POST /api/usuarios/solicitar-codigo/  Body: { "correo": "..." }"""

    permission_classes = [AllowAny]

    def post(self, request):
        correo = request.data.get("correo", "")

        if not correo:
            return Response({"error": "El correo es requerido."}, status=400)

        solicitar_codigo(correo)

        # Siempre responde OK, exista o no el correo (evita filtrar
        # qué correos están registrados en el sistema).
        return Response({"mensaje": "Si el correo existe, se envió un código."})


class VerificarCodigoView(APIView):
    """POST /api/usuarios/verificar-codigo/  Body: { "correo": "...", "codigo": "..." }"""

    permission_classes = [AllowAny]

    def post(self, request):
        correo = request.data.get("correo", "")
        codigo = request.data.get("codigo", "")

        try:
            verificar_codigo(correo, codigo)
        except ValueError as error:
            return Response({"error": str(error)}, status=400)

        return Response({"mensaje": "Código válido."})


class CambiarPasswordView(APIView):
    """
    POST /api/usuarios/cambiar-password/
    Body: { "correo": "...", "codigo": "...", "nueva_password": "..." }
    """

    permission_classes = [AllowAny]

    def post(self, request):
        correo = request.data.get("correo", "")
        codigo = request.data.get("codigo", "")
        nueva_password = request.data.get("nueva_password", "")

        if len(nueva_password) < 6:
            return Response(
                {"error": "La contraseña debe tener al menos 6 caracteres."},
                status=400,
            )

        try:
            cambiar_password(correo, codigo, nueva_password)
        except ValueError as error:
            return Response({"error": str(error)}, status=400)

        return Response({"mensaje": "Contraseña actualizada correctamente."})