<template>
  <div>
    <div id="map" style="height: 100%; width: 100%;" class="h-full w-full"></div>
    <div v-if="selectedLocation">
      <button @click="removeMarker" class="bg-black text-white p-2 rounded mt-2">Remove</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const selectedLocation = ref(null);
const emit = defineEmits(["location-selected"]);
let marker = null; 

onMounted(() => {
    const map = L.map('map').setView([27.1828, 31.1828], 13); 

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  map.on("click", async (e) => {
    const { lat, lng } = e.latlng;

  
    if (marker) {
      map.removeLayer(marker);
    }

    
    marker = L.marker([lat, lng]).addTo(map);

    
    const locationName = await getLocationName(lat, lng);

    selectedLocation.value = { lat, lng, name: locationName };

  
    emit("location-selected", { lat, lng, name: locationName, address: locationName });
  });
});


const removeMarker = () => {
  if (marker) {
    marker.remove(); 
  }
  selectedLocation.value = null; 
  emit("location-selected", null); 
};


const getLocationName = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`
    );
    const data = await response.json();
    return data.display_name || "Name not available";
  } catch (error) {
    console.error("Error fetching location name:", error);
    return "Name not available";
  }
};
</script>
