from rest_framework.routers import DefaultRouter
from .views import CultivoViewSet, CategoriaViewSet, RequerimientoViewSet

router = DefaultRouter()

router.register("cultivos", CultivoViewSet)

router.register("categorias", CategoriaViewSet)

router.register("requerimientos", RequerimientoViewSet)

urlpatterns = router.urls
