from rest_framework.routers import DefaultRouter
from .views import (
    CultivoViewSet,
    CategoriaViewSet,
    EspecificacionViewSet,
    SeguimientoCultivoViewSet,
    AmenazaViewSet,
    TipoAmenazaViewSet,
    EstadoViewSet,
    CultivoUsuarioViewSet,
    TipoSueloViewSet,
    CultivoTipoSueloViewSet,
    AmenazaCultivoViewSet,
)

router = DefaultRouter()

router.register("cultivos", CultivoViewSet)

router.register("categorias", CategoriaViewSet)

router.register("especificaciones", EspecificacionViewSet)

router.register("seguimientos", SeguimientoCultivoViewSet)

router.register("amenazas", AmenazaViewSet)

router.register("tipo-amenazas", TipoAmenazaViewSet)

router.register("estados", EstadoViewSet)

router.register("cultivo-usuario", CultivoUsuarioViewSet)

router.register("cultivo-tipo-suelo", CultivoTipoSueloViewSet)

router.register("tipo-suelo", TipoSueloViewSet)

router.register("amenaza-cultivo", AmenazaCultivoViewSet)

urlpatterns = router.urls
