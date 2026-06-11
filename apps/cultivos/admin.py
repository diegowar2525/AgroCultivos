from django.contrib import admin
from .models import (
    Categoria,
    Especificacion,
    Cultivo,
    Estado,
    CultivoUsuario,
    TipoSuelo,
    CultivoTipoSuelo,
    Amenaza,
    AmenazaCultivo,
    TipoAmenaza,
    SeguimientoCultivo,
)

# Register your models here.
admin.site.register(Categoria)
admin.site.register(Especificacion)
admin.site.register(Cultivo)
admin.site.register(Estado)
admin.site.register(CultivoUsuario)
admin.site.register(TipoSuelo)
admin.site.register(CultivoTipoSuelo)
admin.site.register(Amenaza)
admin.site.register(AmenazaCultivo)
admin.site.register(TipoAmenaza)
admin.site.register(SeguimientoCultivo)
