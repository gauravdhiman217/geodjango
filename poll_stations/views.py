from django.shortcuts import render
from django.http import HttpResponse
from .models import Stations
from django.core.serializers import serialize
from geodjango.settings import API_KEY

URL = 'https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key={API_KEY}&format=json'
def stations(request)->HttpResponse:
    """
    this function is responsible to fetch the station points from the database and 
    send them as a geojson
    """
    station = serialize("geojson", Stations.objects.all())
    context = {'station':station}
    return render(request=request, template_name='poll_stations/map.html', context=context)

def station_api(request):
    station = serialize("geojson", Stations.objects.all())
    return HttpResponse(station)
