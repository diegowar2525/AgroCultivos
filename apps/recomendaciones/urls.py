from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ConsultaViewSet,
    ResultadoConsultaView,
    ResultadoConsultaViewSet,
)

router = DefaultRouter()

router.register("consultas", ConsultaViewSet)
router.register("resultados", ResultadoConsultaViewSet)

urlpatterns = router.urls + [
    path(
        "consultar/",
        ResultadoConsultaView.as_view(),
        name="resultados-consultas",
    ),
]
