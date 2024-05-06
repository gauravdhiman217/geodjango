function initializeMap() {
    const map = L.map('map').setView([20.5937, 78.9629], 5);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    const markers = L.markerClusterGroup();
    pointFeatures.features.forEach(function (feature) {
        const marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
        marker.bindPopup(feature.properties.station);
        markers.addLayer(marker);
    });

    map.addLayer(markers);
}
document.addEventListener('DOMContentLoaded', function () {
    initializeMap();
});
