from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from .serializers import RegistroSerializer, LoginSerializer
from .services.auth_service import autenticar_usuario
from .services.user_service import crear_usuario


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

        usuario = request.user

        return Response({
            "cedula": usuario.cedula,
            "first_name": usuario.first_name,
            "last_name": usuario.last_name,
            "email": usuario.email,
            "genero": usuario.genero,
            "fecha_nacimiento": usuario.fecha_nacimiento,
            "profesion": usuario.profesion,
        })
