
from django.shortcuts import render
from django.http import HttpResponse
from .models import Stations
from django.core.serializers import serialize
from geodjango.settings import API_KEY
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from .serializers import StationDataSerializer, StationSerializer
from rest_framework import generics


def stations(request)->HttpResponse:
    """
    this function is responsible to fetch the station points from the database and 
    send them as a geojson
    """
    return render(request=request, template_name='poll_stations/map.html')

class StationDataApi(APIView):
    """
        this class will handle the station related Live data supported by Govt of india 
        API
    """
    def get(self, request, format=None)->Response:
        station = Stations.objects.all()
        serializer = StationDataSerializer(station, many= True)
        return Response(serializer.data)


class StationApi(generics.ListAPIView):
    # def get(self, request, format=None):
    #     # station = serialize("geojson", Stations.objects.all())

    #     # return Response(station, status=HTTP_200_OK)
        
    queryset = Stations.objects.all()
    serializer_class = StationDataSerializer