from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    RegistroView,
    LoginView,
    PerfilView,
    UsuarioAdminViewSet,
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

    path("", include(router.urls)),
]