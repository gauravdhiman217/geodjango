from rest_framework import serializers
from geodjango.settings import API_KEY
from .models import Stations
import requests
import json
import pandas


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stations
        fields = '__all__'

class StationDataSerializer(serializers.ModelSerializer):
    URL = f'https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key={API_KEY}&format=json&limit=5000'
    response = requests.get(URL)
    res = response.json()
    df = pandas.DataFrame(res['records'])
    
    pollutants = serializers.SerializerMethodField()
    last_updated_date = serializers.SerializerMethodField()
    
    class Meta:
        model = Stations
        fields = [
            'id',
            'geom',
            'country',
            'state',
            'city',
            'station',
            'lon',
            'lat',
            'last_updated_date',
            'pollutants',
        ]
    def get_pollutants(self, obj):
        output = []
        df = self.df[self.df['station'] == obj.station]
        for idx, row in df.iterrows():
            data = {}
            data['id'] = row['pollutant_id']
            data['min'] = row['pollutant_min']
            data['max'] = row['pollutant_max']
            data['avg'] = row['pollutant_avg']
            output.append(data)
            output = sorted(output, key=lambda x:x['id'])
        return serializers.ListField().to_representation(output)
    
    def get_last_updated_date(self, obj):
        df_station = self.df[self.df['station'] == obj.station]
        if not df_station.empty:
            last_updated_date = df_station.iloc[0]['last_update']
            return last_updated_date
        return None