from django.contrib import admin
from .models import Categoria, Requerimiento, Cultivo

# Register your models here.
admin.site.register(Categoria)
admin.site.register(Requerimiento)
admin.site.register(Cultivo)