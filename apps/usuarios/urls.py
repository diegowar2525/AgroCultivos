from django.urls import include, path

from rest_framework.routers import DefaultRouter

from .views import (
    RegistroView,
    LoginView,
    PerfilView,
    RolViewSet,
)

router = DefaultRouter()
router.register("roles", RolViewSet)

urlpatterns = [
    path("register/", RegistroView.as_view()),
    path("login/", LoginView.as_view()),
    path("profile/", PerfilView.as_view()),
    path("", include(router.urls)),
]

# Ejemplo de ruta completa de register: /api/usuarios/register/ o localhost:8000/api/usuarios/register/
