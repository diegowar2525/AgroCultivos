from django.contrib import admin
from .models import Consulta, ResultadoConsulta, TipoConsulta

# Register your models here.
admin.site.register(Consulta)
admin.site.register(ResultadoConsulta)
admin.site.register(TipoConsulta)