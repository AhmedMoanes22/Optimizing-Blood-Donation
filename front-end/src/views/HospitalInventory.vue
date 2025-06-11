<template>
  <MedicalBackground />
  <div class="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-4 md:p-6">
    <!-- Header Section -->
    <div class="max-w-6xl mx-auto mb-8">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-red-100 p-6 md:p-8">
        <div class="flex items-center justify-center mb-6">
          <div class="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-full mr-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Blood Bank Inventory
          </h1>
        </div>
        
        <!-- Summary Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
            <div class="text-2xl font-bold text-blue-600">{{ totalBags }}</div>
            <div class="text-sm text-blue-500 font-medium">Total Bags</div>
          </div>
          <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
            <div class="text-2xl font-bold text-green-600">{{ availableTypes }}</div>
            <div class="text-sm text-green-500 font-medium">Types Available</div>
          </div>
          <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
            <div class="text-2xl font-bold text-yellow-600">{{ lowStockTypes.length }}</div>
            <div class="text-sm text-yellow-500 font-medium">Low Stock</div>
          </div>
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
            <div class="text-2xl font-bold text-purple-600">{{ criticalTypes }}</div>
            <div class="text-sm text-purple-500 font-medium">Critical</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Blood Type Cards Grid -->
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="bloodType in bloodTypes" :key="bloodType.type" 
             class="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-2xl hover:scale-105"
             :class="getCardClasses(bloodType)">
          
          <!-- Status Indicator -->
          <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full border-4 border-white shadow-lg"
               :class="getStatusIndicator(bloodType)"></div>
          
          <div class="p-6">
            <!-- Blood Type Header -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                  <span class="text-white font-bold text-lg">{{ bloodType.type }}</span>
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-800">{{ bloodType.type }}</h2>
                  <p class="text-sm text-gray-500">{{ getBloodTypeDescription(bloodType.type) }}</p>
                </div>
              </div>
            </div>
            
            <!-- Count Display -->
            <div class="text-center mb-6">
              <div class="text-4xl font-bold mb-1" :class="getCountColor(bloodType)">
                {{ bloodType.count }}
              </div>
              <div class="text-sm text-gray-500 font-medium">bags available</div>
              <div class="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div class="h-2 rounded-full transition-all duration-500" 
                     :class="getProgressColor(bloodType)"
                     :style="{ width: Math.min(100, (bloodType.count / 20) * 100) + '%' }"></div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex gap-3">
              <button 
                @click="updateCount(bloodType.type, -1)"
                :disabled="bloodType.count <= 0 || loading"
                class="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium transition-all duration-200 hover:from-red-600 hover:to-red-700 hover:shadow-lg disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100 active:scale-95">
                <span class="flex items-center justify-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 10h12v2H4z"/>
                  </svg>
                  Remove
                </span>
              </button>
              
              <button 
                @click="updateCount(bloodType.type, 1)"
                :disabled="loading"
                class="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium transition-all duration-200 hover:from-green-600 hover:to-green-700 hover:shadow-lg active:scale-95">
                <span class="flex items-center justify-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 4v12m-6-6h12"/>
                  </svg>
                  Add
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Status Messages -->
    <div class="max-w-6xl mx-auto mt-8">
      <!-- Loading State -->
      <Transition name="fade">
        <div v-if="loading" class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200 p-6 mb-4">
          <div class="flex items-center justify-center text-blue-600">
            <div class="animate-pulse flex items-center">
              <div class="w-8 h-8 bg-blue-500 rounded-full mr-3 animate-bounce"></div>
              <span class="text-lg font-medium">Updating inventory...</span>
            </div>
          </div>
        </div>
      </Transition>
      
      <!-- Error Message -->
      <Transition name="slide-up">
        <div v-if="error" class="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-2xl shadow-lg p-6 mb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="bg-red-500 rounded-full p-2 mr-4">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-red-800">Error</h3>
                <p class="text-red-700">{{ error }}</p>
              </div>
            </div>
            <button @click="error = null" class="text-red-500 hover:text-red-700 text-2xl font-bold">&times;</button>
          </div>
        </div>
      </Transition>
      
      <!-- Success Message -->
      <Transition name="slide-up">
        <div v-if="success" class="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-2xl shadow-lg p-6 mb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="bg-green-500 rounded-full p-2 mr-4">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-green-800">Success</h3>
                <p class="text-green-700">Inventory updated successfully!</p>
              </div>
            </div>
            <button @click="success = false" class="text-green-500 hover:text-green-700 text-2xl font-bold">&times;</button>
          </div>
        </div>
      </Transition>
      
      <!-- Low Stock Warning -->
      <Transition name="slide-up">
        <div v-if="lowStockTypes.length > 0" class="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-2xl shadow-lg p-6 mb-4">
          <div class="flex items-start">
            <div class="bg-yellow-500 rounded-full p-2 mr-4 mt-1">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-yellow-800 mb-2">Low Stock Alert</h3>
              <p class="text-yellow-700 mb-3">
                The following blood types are running low (less than {{ lowStockThreshold }} bags):
              </p>
              <div class="flex flex-wrap gap-2">
                <span v-for="type in lowStockTypes" :key="type" 
                      class="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium">
                  {{ type }}
                </span>
              </div>
              <p class="text-yellow-600 text-sm mt-3">Please consider requesting more donations for these blood types.</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>
    
    <!-- Action Buttons -->
    <div class="max-w-6xl mx-auto mt-8 text-center">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
        <button 
          @click="fetchInventory"
          :disabled="loading"
          class="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed active:scale-95">
          <span class="flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
            </svg>
            {{ loading ? 'Refreshing...' : 'Refresh Inventory' }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import MedicalBackground from '@/components/MedicalBackground.vue'
// Configuration
const lowStockThreshold = 5;

// Blood types data with additional metadata
const bloodTypes = ref([
  { type: 'A+', count: 12, description: 'Universal plasma donor' },
  { type: 'A-', count: 3, description: 'Can donate to A+, A-, AB+, AB-' },
  { type: 'B+', count: 8, description: 'Can donate to B+, AB+' },
  { type: 'B-', count: 2, description: 'Can donate to B+, B-, AB+, AB-' },
  { type: 'AB+', count: 15, description: 'Universal recipient' },
  { type: 'AB-', count: 1, description: 'Can donate to AB+, AB-' },
  { type: 'O+', count: 20, description: 'Can donate to all positive types' },
  { type: 'O-', count: 4, description: 'Universal donor' },
]);

// UI state
const loading = ref(false);
const error = ref(null);
const success = ref(false);

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: 'https://your-api-endpoint.com/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Computed properties
const totalBags = computed(() => {
  return bloodTypes.value.reduce((total, type) => total + type.count, 0);
});

const availableTypes = computed(() => {
  return bloodTypes.value.filter(type => type.count > 0).length;
});

const lowStockTypes = computed(() => {
  return bloodTypes.value
    .filter(type => type.count < lowStockThreshold && type.count > 0)
    .map(type => type.type);
});

const criticalTypes = computed(() => {
  return bloodTypes.value.filter(type => type.count === 0).length;
});

// Helper functions for styling
const getCardClasses = (bloodType) => {
  if (bloodType.count === 0) {
    return 'border-red-300 bg-gradient-to-br from-red-50 to-red-100';
  } else if (bloodType.count < lowStockThreshold) {
    return 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100';
  } else {
    return 'border-green-300 bg-gradient-to-br from-green-50 to-green-100';
  }
};

const getStatusIndicator = (bloodType) => {
  if (bloodType.count === 0) {
    return 'bg-red-500';
  } else if (bloodType.count < lowStockThreshold) {
    return 'bg-yellow-500';
  } else {
    return 'bg-green-500';
  }
};

const getCountColor = (bloodType) => {
  if (bloodType.count === 0) {
    return 'text-red-600';
  } else if (bloodType.count < lowStockThreshold) {
    return 'text-yellow-600';
  } else {
    return 'text-green-600';
  }
};

const getProgressColor = (bloodType) => {
  if (bloodType.count === 0) {
    return 'bg-red-500';
  } else if (bloodType.count < lowStockThreshold) {
    return 'bg-yellow-500';
  } else {
    return 'bg-green-500';
  }
};

const getBloodTypeDescription = (type) => {
  const bloodType = bloodTypes.value.find(bt => bt.type === type);
  return bloodType?.description || '';
};

// API functions
const fetchInventory = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    const response = await api.get('/blood-inventory');
    
    bloodTypes.value = bloodTypes.value.map(type => {
      const backendType = response.data.find(t => t.type === type.type);
      return backendType ? { ...type, count: backendType.count } : type;
    });
    
  } catch (err) {
    handleApiError(err, 'Failed to fetch inventory data');
  } finally {
    loading.value = false;
  }
};

const updateCount = async (type, change) => {
  try {
    loading.value = true;
    success.value = false;
    error.value = null;
    
    const bloodType = bloodTypes.value.find(t => t.type === type);
    const newCount = Math.max(0, bloodType.count + change);
    
    bloodType.count = newCount;
    
    await api.post('/blood-inventory/update', {
      bloodType: type,
      count: newCount,
    });
    
    success.value = true;
    setTimeout(() => success.value = false, 3000);
  } catch (err) {
    handleApiError(err, 'Failed to update inventory');
  } finally {
    loading.value = false;
  }
};

const handleApiError = (err, defaultMessage) => {
  if (err.response) {
    error.value = err.response.data.message || defaultMessage;
    console.error('Error response:', err.response.data);
    console.error('Status code:', err.response.status);
  } else if (err.request) {
    error.value = 'No response received from server. Please check your connection.';
    console.error('No response received:', err.request);
  } else {
    error.value = err.message || defaultMessage;
    console.error('Request error:', err.message);
  }
  
  setTimeout(() => error.value = null, 5000);
};

// Initialize component
onMounted(() => {
  // Comment out API call for demo purposes
  // fetchInventory();
});
</script>

<style scoped>
/* Custom animations */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-8px);
  }
  70% {
    transform: translateY(-4px);
  }
  90% {
    transform: translateY(-2px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Transition styles */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.3s ease-out;
}
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>