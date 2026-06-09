from django.urls import path

from .views import (
    RegistroView,
    LoginView,
    PerfilView,
)

urlpatterns = [
    path("register/", RegistroView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", PerfilView.as_view(), name="profile"),
]
