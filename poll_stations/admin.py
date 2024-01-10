from django.contrib import admin
from .models import Stations
# Register your models here.

class StationsAdmin(admin.ModelAdmin):
    point_zoom =1

admin.site.register(Stations, StationsAdmin)