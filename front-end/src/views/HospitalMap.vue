<template>
  <!-- Medical Heartbeat Background -->
  <MedicalBackground />

  <div class="min-h-screen relative z-10">
    <Header />
    
    <div class="container mx-auto p-4 max-w-5xl">
      <!-- Main Card Container -->
      <div class="bg-white/95 backdrop-blur-xl border-2 border-red-200/50 rounded-xl shadow-2xl shadow-red-500/20 overflow-hidden transition-all duration-300 hover:shadow-red-500/30 hover:shadow-3xl">
        <!-- Header Section -->
        <div class="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white relative overflow-hidden">
          <!-- Medical Cross Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-4 left-4 w-6 h-6">
              <div class="absolute top-0 left-1/2 w-1 h-6 bg-white transform -translate-x-1/2 rounded-full"></div>
              <div class="absolute top-1/2 left-0 w-6 h-1 bg-white transform -translate-y-1/2 rounded-full"></div>
            </div>
            <div class="absolute top-4 right-4 w-6 h-6">
              <div class="absolute top-0 left-1/2 w-1 h-6 bg-white transform -translate-x-1/2 rounded-full"></div>
              <div class="absolute top-1/2 left-0 w-6 h-1 bg-white transform -translate-y-1/2 rounded-full"></div>
            </div>
          </div>
          
          <div class="relative z-10 flex items-center gap-3">
            <!-- Location Icon -->
            <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold">🩸 Location Selection</h1>
              <p class="text-red-100">Please select your donation center location</p>
            </div>
          </div>
        </div>

        <!-- Content Area -->
        <div class="p-6 relative">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-5">
            <div class="grid grid-cols-12 gap-4 h-full">
              <div v-for="i in 48" :key="i" class="bg-red-300 rounded-full"></div>
            </div>
          </div>
          
          <!-- Address Input -->
          <div class="relative mb-8 z-10">
            <div class="relative group">
              <input
                v-model="selectedAddress"
                type="text"
                id="floating_outlined_address"
                class="block px-4 pb-3 pt-4 w-full text-sm text-gray-900 bg-white/80 backdrop-blur-sm rounded-lg border-2 border-red-200 appearance-none focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500 peer transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white/90"
                placeholder=" "
              />
              <label
                for="floating_outlined_address"
                class="absolute text-sm text-red-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 font-semibold"
              >
                🏥 Donation Center Address
              </label>
              <!-- Animated underline -->
              <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400 origin-left scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-700"></div>
            </div>
          </div>

          <!-- Map Container -->
          <div class="rounded-lg overflow-hidden border-2 border-red-200/50 shadow-2xl shadow-red-500/10 h-[480px] relative">
            <!-- Map overlay decoration -->
            <div class="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
              <div class="flex items-center gap-2 text-red-600 text-sm font-semibold">
                <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Find Donation Centers
              </div>
            </div>
            
            <MapComponent 
              @location-selected="handleLocationSelected" 
              class="h-full w-full"
            />
          </div>

          <!-- Additional Info -->
          <div class="mt-4 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-lg">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <div class="text-red-700 text-sm">
                <p class="font-semibold mb-1">💡 Quick Tip:</p>
                <p>Click on the map to select the nearest blood donation center. You can also type your address in the search box above.</p>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex justify-between mt-8 space-x-4 relative z-10">
            <BlobButton 
              @click="navigatePrevious"
              class="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              ← Previous
            </BlobButton>
            <BlobButton 
              @click="validateForm"
              :disabled="isLoading"
              class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isLoading" class="flex items-center gap-2">
                Next →
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            </BlobButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import * as THREE from 'three';
import MapComponent from "../components/MapComponent.vue";
import Header from "@/components/HeaderSection.vue";
import BlobButton from "../components/BlobButton.vue";
import MedicalBackground from '@/components/MedicalBackground.vue'
const router = useRouter();
const selectedAddress = ref('');
const formData = ref({});
const isLoading = ref(false);

// 3D Scene Refs
const bloodCellsGrid = ref(null)

// Animation and cleanup refs
let animationId = null
let scene = null
let camera = null
let renderer = null
let bloodCellsMesh = null
let resizeHandler = null

// Initialize 3D Blood Cells Background
onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem('hospitalSearchData'));
  if (savedData) {
    formData.value = savedData;
    if (savedData.address) {
      selectedAddress.value = savedData.address;
    }
  }
  
  // Initialize blood cells animation
  setTimeout(() => {
    initBloodCells()
  }, 100)
});

// Cleanup on unmount
onUnmounted(() => {
  cleanup()
})

const initBloodCells = () => {
  if (!bloodCellsGrid.value) {
    console.warn('Blood cells container not found')
    return
  }

  try {
    // Create scene
    scene = new THREE.Scene()
    
    // Create camera
    camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    )
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // Append to DOM
    bloodCellsGrid.value.appendChild(renderer.domElement)

    // Create blood cells
    const cellsGeometry = new THREE.BufferGeometry()
    const cellCount = 400 // Reduced for better performance on content pages
    
    const posArray = new Float32Array(cellCount * 3)
    const colorArray = new Float32Array(cellCount * 3)
    
    for(let i = 0; i < cellCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 15     // x
      posArray[i + 1] = (Math.random() - 0.5) * 15 // y
      posArray[i + 2] = (Math.random() - 0.5) * 15 // z
      
      // Red blood cell colors
      const intensity = 0.6 + Math.random() * 0.4
      colorArray[i] = intensity         // r (red)
      colorArray[i + 1] = 0.1          // g (minimal green)
      colorArray[i + 2] = 0.1          // b (minimal blue)
    }
    
    cellsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    cellsGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))
    
    // Create material
    const cellsMaterial = new THREE.PointsMaterial({
      size: 0.02,
      transparent: true,
      opacity: 0.4, // More subtle for content page
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      sizeAttenuation: true
    })
    
    // Create mesh
    bloodCellsMesh = new THREE.Points(cellsGeometry, cellsMaterial)
    scene.add(bloodCellsMesh)

    // Position camera
    camera.position.z = 5

    // Start animation
    animate()

    // Handle resize
    resizeHandler = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
    }
    
    window.addEventListener('resize', resizeHandler)
    
  } catch (error) {
    console.error('Failed to initialize blood cells:', error)
  }
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  if (bloodCellsMesh) {
    // Very gentle circulation motion
    bloodCellsMesh.rotation.x += 0.0001
    bloodCellsMesh.rotation.y += 0.0002
    
    // Subtle heartbeat-like pulsing motion
    const time = Date.now() * 0.001
    bloodCellsMesh.position.y = Math.sin(time) * 0.02
    bloodCellsMesh.position.x = Math.cos(time * 0.5) * 0.015
  }
  
  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

const cleanup = () => {
  // Stop animation
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  
  // Remove event listeners
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
  
  // Dispose of Three.js objects
  if (bloodCellsMesh) {
    if (bloodCellsMesh.geometry) {
      bloodCellsMesh.geometry.dispose()
    }
    if (bloodCellsMesh.material) {
      bloodCellsMesh.material.dispose()
    }
    scene?.remove(bloodCellsMesh)
    bloodCellsMesh = null
  }
  
  if (renderer) {
    renderer.dispose()
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
    renderer = null
  }
  
  scene = null
  camera = null
}

const handleLocationSelected = (location) => {
  if (location) {
    selectedAddress.value = location.address || location.name;
    // Update the formData with the new address
    formData.value.address = selectedAddress.value;
  } else {
    selectedAddress.value = '';
    formData.value.address = '';
  }
};

const navigatePrevious = () => {
  router.go(-1);
};

const validateForm = async () => {
  if (!selectedAddress.value) {
    alert('Please select a donation center location on the map');
    return;
  }

  // Update localStorage with the complete data
  localStorage.setItem('hospitalSearchData', JSON.stringify(formData.value));
  
  try {
    isLoading.value = true;
    
    // Send data to backend
    const response = await axios.post('https://fakestoreapi.com/users', formData.value, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Data sent successfully:', response.data);
    console.log('Data sent successfully:', formData.value);
    
    // Navigate to next page with the response data if needed
    router.push({
      name: 'hospital-result',
      state: { formData: formData.value, responseData: response.data }
    });
  } catch (error) {
    console.error("Full error details:", error);
    console.error("Error response data:", error.response?.data);
    alert("Failed to save data. Check console for details.");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-stops));
}

/* Heartbeat ECG Line Animation */
.heartbeat-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    transparent 20%, 
    #ef4444 21%, 
    #ef4444 22%, 
    transparent 23%, 
    transparent 40%, 
    #ef4444 41%, 
    #ef4444 45%, 
    transparent 46%, 
    transparent 60%, 
    #ef4444 61%, 
    #ef4444 62%, 
    transparent 63%, 
    transparent 100%
  );
  animation: heartbeat-pulse 3s infinite;
}

@keyframes heartbeat-pulse {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Enhanced shadows */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style>