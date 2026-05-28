from rest_framework.routers import DefaultRouter
from .views import CultivoViewSet, CategoriaViewSet

router = DefaultRouter()

router.register("cultivos", CultivoViewSet)

router.register("categorias", CategoriaViewSet)

urlpatterns = router.urls
