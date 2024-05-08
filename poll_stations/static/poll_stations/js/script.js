function changeText(feature){
  document.getElementById('station_header').innerHTML = feature.properties.station;
};

function initializeMap(data) {
  const map = L.map('map').setView([20.5937, 78.9629], 5);
  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  const markers = L.markerClusterGroup();
  var pointFeatures = JSON.parse(data);
  var chimneyIcon = new L.icon({
    iconUrl: iconImage,
    iconSize: [60, 95],
  });
  var sidebar = L.control.sidebar('sidebar', {
    closeButton: true,
    position: 'left'
  });
  map.on('click', function () {
    sidebar.hide();
  })
  map.addControl(sidebar);
  pointFeatures.features.forEach(function (feature) {
    const marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], { icon: chimneyIcon });
    marker.bindPopup(feature.properties.station);

    marker.on('click', function () {
      sidebar.toggle();
      changeText(feature);
    });

    markers.addLayer(marker);
  });

  map.addLayer(markers);
};
fetch(window.location.href + 'api')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('API request failed');
    }
  })
  .then(data => {
    initializeMap(data);
  })
  .catch(error => {
    console.error(error);
  });
