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

        if not value or value.strip() == "":
            raise serializers.ValidationError(
                "El campo de correo no puede estar en blanco."
            )

        if not value.lower().endswith("@gmail.com"):
            raise serializers.ValidationError(
                "El correo debe ser del dominio @gmail.com."
            )

        queryset = Usuario.objects.filter(email=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError("Este correo ya está registrado.")

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


class PerfilSerializer(UsuarioBaseSerializer):
    username = serializers.CharField(read_only=True)

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
        )
