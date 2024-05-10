function colorDecider(id, value){
    if (id != 'CO'){
      if (value < 50){
        return 'progress-bar bg-success'
      }
      else if (value < 300){
        return 'progress-bar bg-warning'

      }
      else{
        return 'progress-bar bg-danger'
      }
    }
    else{
      if (value < 5){
        return 'progress-bar bg-success'
      }
      else if (value < 20){
        return 'progress-bar bg-warning'

      }
      else{
        return 'progress-bar bg-danger'
      }
    }
}


function changeText(feature){
  document.getElementById('station').innerHTML = "Station : " +feature.station;
  document.getElementById('country').innerHTML = "Country : " +feature.country;
  document.getElementById('city').innerHTML = "City : " +feature.city;
  document.getElementById('state').innerHTML = "State : " +feature.state;
  document.getElementById('last_updated').innerHTML = "Last Updated Time : " +feature.last_updated_date;
  const pollutantsContainer = document.getElementById('pollutants-container');
  pollutantsContainer.innerHTML = '';
  feature.pollutants.forEach(pollutant => {
    const pollutantElement = document.createElement('div');
    pollutantElement.className = 'pollutant';

    const nameElement = document.createElement('span');
    nameElement.textContent = pollutant.id;
    pollutantElement.appendChild(nameElement);

    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress';

    
    const spanDiv = document.createElement('div');

    const min = document.createElement('span');
    min.textContent = "Min Value : " + pollutant.min;
    min.className ="minValue";
    spanDiv.appendChild(min);

    const max = document.createElement('span');
    max.textContent = "Max Value : " + pollutant.max;
    max.className ="maxValue";
    spanDiv.appendChild(max);
    pollutantElement.appendChild(spanDiv);


    const progressBar = document.createElement('div');
    let cls = colorDecider(pollutant.id, pollutant.avg)
    progressBar.className = `${cls}`;
    progressBar.ariaValueNow = `${pollutant.avg}`;
    progressBar.ariaValueMax = `${pollutant.max}`;
    progressBar.ariaValueMin = `${pollutant.min}`;
    progressBar.style.width = `${pollutant.avg}%`; 
    progressBarContainer.appendChild(progressBar);
    
    const avg = document.createElement('span');
    avg.textContent = pollutant.avg;
    avg.className ="avgValue";
    progressBarContainer.appendChild(avg);
    
    pollutantElement.appendChild(progressBarContainer);
    const hr = document.createElement('hr');
    pollutantElement.appendChild(hr);

    // Append the pollutant element to the container
    pollutantsContainer.appendChild(pollutantElement);
});
};

async function initializeMap(data) {
  const map = L.map('map').setView([20.5937, 78.9629], 5);
  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  const markers = L.markerClusterGroup();
  try {
    const response = await fetch('api');
    if (!response.ok) {
        throw new Error('API request failed');
    }
    const data = await response.json();
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
    data.forEach(function (feature) {
      const marker = L.marker([feature.lat, feature.lon], { icon: chimneyIcon });
      marker.bindPopup(feature.station);
      marker.on('click', function () {
        sidebar.show();
        changeText(feature);
      });

    markers.addLayer(marker);
  });

  map.addLayer(markers);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initializeMap().catch(error => {
      console.error('Map initialization error:', error);
  });
});

// fetch(window.location.href + 'api')
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('API request failed');
//     }
//   })
//   .then(data => {
//     initializeMap(data);
//   })
//   .catch(error => {
//     console.error(error);
//   });
