from django.contrib import admin
from .models import Provincia, Canton, Parroquia, Ubicacion, CondicionClimatica

# Register your models here.
admin.site.register(Provincia)
admin.site.register(Canton)
admin.site.register(Parroquia)
admin.site.register(Ubicacion)
admin.site.register(CondicionClimatica)