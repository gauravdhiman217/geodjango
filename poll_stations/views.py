from django.shortcuts import render
from django.http import HttpResponse
from .models import Stations
from django.core.serializers import serialize
def stations(request)->HttpResponse:
    """
    this is demo function
    """
    station = serialize("geojson", Stations.objects.all()[:10])
    print(station)
    context = {'station':station}
    return render(request=request, template_name='poll_stations/map.html', context=context)
