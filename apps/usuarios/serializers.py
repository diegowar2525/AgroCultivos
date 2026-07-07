from rest_framework import serializers
from apps.usuarios.models import Usuario
from .utils import validar_cedula_ec


class UsuarioBaseSerializer(serializers.ModelSerializer):
    def validate_cedula(self, value):
        es_valida, mensaje_error = validar_cedula_ec(value)

        if not es_valida:
            raise serializers.ValidationError(mensaje_error)

        return value

    def validate_email(self, value):
        if not value.lower().endswith("@gmail.com"):
            raise serializers.ValidationError(
                "El correo debe ser del dominio @gmail.com."
            )

        return value


class RegistroSerializer(UsuarioBaseSerializer):
    password = serializers.CharField(write_only=True)

    confirmar_password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario

        fields = (
            "cedula",
            "first_name",
            "last_name",
            "email",
            "genero",
            "fecha_nacimiento",
            "profesion",
            "password",
            "confirmar_password",
        )

    def validate(self, attrs):

        if attrs["password"] != attrs["confirmar_password"]:
            raise serializers.ValidationError("Las contraseñas no coinciden.")

        return attrs


class LoginSerializer(serializers.Serializer):
    identificador = serializers.CharField()

    password = serializers.CharField()


class PerfilSerializer(UsuarioBaseSerializer):
    username = serializers.CharField(read_only=True)
    cedula = serializers.CharField(read_only=True)
    is_staff = serializers.BooleanField(read_only=True)
    fecha_registro = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Usuario
        fields = (
            "username",
            "cedula",
            "first_name",
            "last_name",
            "email",
            "genero",
            "fecha_nacimiento",
            "profesion",
            "is_staff",
            "fecha_registro",
        )


class UsuarioAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = (
            "id",
            "username",
            "cedula",
            "first_name",
            "last_name",
            "email",
            "genero",
            "fecha_nacimiento",
            "profesion",
            "is_staff",
            'is_active',
            "date_joined",
        )
