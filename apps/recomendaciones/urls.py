from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import ConsultaViewSet, ResultadoConsultaView

router = DefaultRouter()

router.register("consultas", ConsultaViewSet)

urlpatterns = router.urls + [
    path(
        "resultados/",
        ResultadoConsultaView.as_view(),
        name="resultados-recomendaciones",
    ),
]
