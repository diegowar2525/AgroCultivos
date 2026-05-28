from rest_framework.routers import DefaultRouter

from .views import ProvinciaViewSet, CantonViewSet, ParroquiaViewSet, UbicacionViewSet

router = DefaultRouter()

router.register("provincias", ProvinciaViewSet)
router.register("cantones", CantonViewSet)
router.register("parroquias", ParroquiaViewSet)
router.register("ubicaciones", UbicacionViewSet)

urlpatterns = router.urls
