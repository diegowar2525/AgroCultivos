from rest_framework import serializers
from apps.usuarios.models import Usuario, Rol
from .utils import validar_cedula_ec


class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    confirmar_password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario

        fields = (
            "cedula",
            "nombres",
            "apellidos",
            "email",
            "genero",
            "fecha_nacimiento",
            "profesion",
            "password",
            "confirmar_password",
        )

    def validate_cedula(self, value):

        if not validar_cedula_ec(value):
            raise serializers.ValidationError("Cédula inválida.")

        return value

    def validate(self, attrs):

        if attrs["password"] != attrs["confirmar_password"]:
            raise serializers.ValidationError("Las contraseñas no coinciden.")

        return attrs


class LoginSerializer(serializers.Serializer):
    identificador = serializers.CharField()

    password = serializers.CharField()


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = "__all__"
