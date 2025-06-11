<template>
  <div class="min-h-screen bg-white">
    <Header />
    
    <div class="container mx-auto p-4 max-w-5xl">
      <!-- Main Card Container -->
      <div class="bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <!-- Header Section -->
        <div class="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white">
          <h1 class="text-2xl font-bold">Location Selection</h1>
          <p class="text-blue-100">Please select your location on the map</p>
        </div>

        <!-- Content Area -->
        <div class="p-6">
          <!-- Address Input -->
          <div class="relative mb-8 z-10">
            <input
              v-model="selectedAddress"
              type="text"
              id="floating_outlined_address"
              class="block px-3 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 peer transition duration-300 shadow-sm hover:shadow-md"
              placeholder=" "
            />
            <label
              for="floating_outlined_address"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Address
            </label>
          </div>

          <!-- Map Container -->
          <div class="rounded-lg overflow-hidden border border-gray-200 shadow-inner h-[480px] relative z-0">
            <MapComponent 
              @location-selected="handleLocationSelected" 
              class="h-full w-full"
            />
          </div>

          <!-- Buttons -->
          <div class="flex justify-between mt-8 space-x-4">
            <BlobButton @click="navigatePrevious">
              Previous
            </BlobButton>
            <div class="flex space-x-4">
              <BlobButton 
                @click="showDataPreview"
                class="bg-blue-500 hover:bg-blue-600"
              >
                Preview Data
              </BlobButton>
              <BlobButton 
                @click="validateForm"
                :disabled="isLoading"
              >
                <span v-if="isLoading">Processing...</span>
                <span v-else>Submit</span>
              </BlobButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Preview Modal -->
    <div v-if="showPreview" class="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur  bg-opacity-20">
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white sticky top-0">
          <h2 class="text-xl font-bold">Data Preview</h2>
          <p class="text-blue-100">Review your information before submitting</p>
        </div>
        
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(value, key) in donorData" :key="key" class="border-b border-gray-200 pb-4">
              <h3 class="font-semibold text-gray-700 capitalize">{{ key.replace(/([A-Z])/g, ' $1').trim() }}</h3>
              <p class="text-gray-800 mt-1 break-words">
                {{ value || '(Not provided)' }}
              </p>
            </div>
          </div>

          <div class="flex justify-end space-x-4 mt-8">
            <button 
              @click="showPreview = false"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button 
              @click="confirmSubmission"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Confirm Submission
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; // Import axios

import MapComponent from "../components/MapComponent.vue";
import Header from "@/components/HeaderSection.vue";
import BlobButton from "../components/BlobButton.vue";

const router = useRouter();
const selectedAddress = ref('');
const donorData = ref({});
const isLoading = ref(false);
const showPreview = ref(false);

// Load data from localStorage when component mounts
onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem('DonorSearchData'));
  if (savedData) {
    donorData.value = savedData;
    if (savedData.address) {
      selectedAddress.value = savedData.address;
    }
  }
});

const handleLocationSelected = (location) => {
  if (location) {
    selectedAddress.value = location.address || location.name;
    donorData.value.address = selectedAddress.value;
  } else {
    selectedAddress.value = '';
    donorData.value.address = '';
  }
};

const navigatePrevious = () => {
  router.go(-1);
};

const showDataPreview = () => {
  if (!selectedAddress.value) {
    alert('Please select a location first');
    return;
  }
  showPreview.value = true;
};

const confirmSubmission = () => {
  showPreview.value = false;
  validateForm();
};

const validateForm = async () => {
  if (!selectedAddress.value) {
    alert('Please select a location on the map');
    return;
  }

  // Update localStorage with the complete data
  localStorage.setItem('DonorSearchData', JSON.stringify(donorData.value));
  
  try {
    isLoading.value = true;
    
    // Send data to backend using axios
    const response = await axios.post('https://localhost:7106/api/Account/register-recipient', donorData.value, {
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers like authorization if needed
        // 'Authorization': `Bearer ${yourToken}`
      }
    });

    // Check if the request was successful
    if (response.status === 200 || response.status === 201) {
      // Clear the local storage if needed
      localStorage.removeItem('DonorSearchData');
      
      // Navigate to confirmation page with the response data
      router.push({
        name: 'BloodResult',
        state: { 
          donorData: donorData.value,
          responseData: response.data // Include any data returned from the server
        }
      });
    } else {
      throw new Error('Failed to submit data');
    }
  } catch (error) {
    console.error("Error:", error);
    
    // Show more detailed error message if available
    const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Failed to submit data. Please try again.";
    alert(errorMessage);
  } finally {
    isLoading.value = false;
  }
};
</script>