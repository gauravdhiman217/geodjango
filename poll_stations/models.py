# from django.db import models
from django.contrib.gis.db import models
# Create your models here.
class Stations(models.Model):
    
    #geometry coloum
    geom = models.PointField()
    country = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    station = models.CharField(max_length=200)
    lon = models.FloatField()
    lat = models.FloatField()


    def __str__(self)->str:
        """this method will give reprentative text of the object"""
        return self.station +"_"+ self.city