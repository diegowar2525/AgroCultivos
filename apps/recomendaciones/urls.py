from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ConsultaViewSet,
    RecomendarGeoView,
    ResultadoConsultaViewSet,
)

router = DefaultRouter()

router.register("consultas", ConsultaViewSet)
router.register("resultados", ResultadoConsultaViewSet)

urlpatterns = router.urls + [
    path("recomendar-geo/", RecomendarGeoView.as_view(), name="recomendar-geo"),
]
