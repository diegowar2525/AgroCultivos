from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    RegistroView,
    LoginView,
    PerfilView,
    UsuarioAdminViewSet,
    SolicitarCodigoView,
    VerificarCodigoView,
    CambiarPasswordView,
)

router = DefaultRouter()

router.register(
    "admin/usuarios",
    UsuarioAdminViewSet,
    basename="admin-usuarios"
)

urlpatterns = [
    path("register/", RegistroView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", PerfilView.as_view(), name="profile"),

    path("solicitar-codigo/", SolicitarCodigoView.as_view(), name="solicitar-codigo"),
    path("verificar-codigo/", VerificarCodigoView.as_view(), name="verificar-codigo"),
    path("cambiar-password/", CambiarPasswordView.as_view(), name="cambiar-password"),

    path("", include(router.urls)),
]