from django.urls import path

from .views import (
    RegistroView,
    LoginView,
    PerfilView,
)

urlpatterns = [
    path("register/", RegistroView.as_view()),
    path("login/", LoginView.as_view()),
    path("profile/", PerfilView.as_view()),
]
