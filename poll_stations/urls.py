from . import views
from django.urls import path, include
app_name= "poll_stations"
urlpatterns = [
    path('', views.stations, name='stations'),
]
