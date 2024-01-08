from django.shortcuts import render
from django.http import HttpResponse

def stations(request)->HttpResponse:
    """
    this is demo function
    """
    return render(request=request, template_name='poll_stations/map.html')
