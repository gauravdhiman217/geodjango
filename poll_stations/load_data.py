from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from .models import Stations

world_mapping = {
    "country": "country",
    "state": "state",
    "city": "city",
    "station": "station",
    "lat": "latitude",
    "lon": "longitude",
    "geom": "Point",
}

world_shp = Path(__file__).resolve().parent / "data" / "station_points.shp"


def run(verbose=True):
    lm = LayerMapping(Stations, world_shp, world_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)