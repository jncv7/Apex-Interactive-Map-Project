// Initialize the map
const map = L.map('map').setView([0, 0], 2); // Default to world view

// Load map tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Icon settings
const customIcon = L.icon({
  iconUrl: 'assets/icons/apex-icon.png',
  iconSize: [32, 32], // Icon size
  iconAnchor: [16, 32] // Anchor point
});

// Add functionality to place markers
map.on('click', function (e) {
  const { lat, lng } = e.latlng;
  const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
  
  // Add popup to marker
  marker.bindPopup(`Coordinates: ${lat.toFixed(2)}, ${lng.toFixed(2)}`).openPopup();
});

// Distance measurement
let lastMarker = null;
map.on('click', function (e) {
  const { lat, lng } = e.latlng;
  const newMarker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

  if (lastMarker) {
    const distance = map.distance(lastMarker.getLatLng(), newMarker.getLatLng());
    L.polyline([lastMarker.getLatLng(), newMarker.getLatLng()], { color: 'red' }).addTo(map);
    alert(`Distance: ${distance.toFixed(2)} meters`);
  }

  lastMarker = newMarker;
});
