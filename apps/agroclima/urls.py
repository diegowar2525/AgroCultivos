from rest_framework.routers import DefaultRouter

from .views import (
    CondicionClimaticaViewSet,
    ProvinciaViewSet,
    CantonViewSet,
    ParroquiaViewSet,
    UbicacionViewSet,
)

router = DefaultRouter()

router.register("provincias", ProvinciaViewSet)
router.register("cantones", CantonViewSet)
router.register("parroquias", ParroquiaViewSet)
router.register("ubicaciones", UbicacionViewSet)
router.register("condiciones-climaticas", CondicionClimaticaViewSet)

urlpatterns = router.urls
