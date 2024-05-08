from . import views
from django.urls import path, include
app_name= "poll_stations"
urlpatterns = [
    path('', views.stations, name='stations'),
    # path('geojson', views.station_api, name='stations_api'),
    path('api', views.StationApi.as_view(), name='api'),
    path('station_data', views.StationDataApi.as_view(), name='station_data'),
]
