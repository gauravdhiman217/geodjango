
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',TemplateView.as_view(template_name='poll_stations/index.html')),
    path('stations/',include('poll_stations.urls'))
]
