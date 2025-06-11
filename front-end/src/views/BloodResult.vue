<template>
  <MedicalBackground />
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <main class="flex-grow px-4 py-6 max-w-md mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-6 text-center">
        Donation Request
      </h1>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p>Loading hospitals...</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{{ error }}</span>
      </div>
      
      <!-- Hospital Cards -->
      <div v-else>
        <div 
          v-for="hospital in hospitals" 
          :key="hospital.id"
          class="bg-white rounded-lg shadow-lg p-4 mb-6"
        >
          <div class="flex items-center space-x-4">
            <div class="w-20 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                :src="hospital.imageUrl || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=120&h=80&fit=crop&crop=center'" 
                :alt="hospital.name"
                class="w-full h-full object-cover"
              />
            </div>
            
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-gray-900 mb-2">
                {{ hospital.name }}
              </h2>
              <p class="text-sm text-gray-600 leading-relaxed">
                {{ hospital.address }}
              </p>
            </div>
            
            <button 
              @click="continueToHospital(hospital.id)"
              class="bg-green-400 hover:bg-green-500 text-black font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-6">
      <div class="max-w-md mx-auto">
        <div class="flex justify-between items-center mb-4">
          <div>
            <div class="text-lg font-medium mb-1">Together,</div>
            <div class="text-lg font-medium mb-1">We're</div>
            <div class="text-lg font-medium">Lifeblood.</div>
          </div>
          
          <div class="text-right">
            <div class="text-2xl font-bold">Call 15366</div>
          </div>
        </div>
        
        <div class="border-t border-red-500 pt-4">
          <div class="text-sm mb-3">Follow us</div>
          <div class="flex space-x-3">
            <button class="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"/>
              </svg>
            </button>
            
            <button class="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <svg class="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </button>
            
            <button class="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <svg class="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"/>
              </svg>
            </button>
            
            <button class="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <svg class="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Header from "@/components/HeaderSection.vue";
import MedicalBackground from '@/components/MedicalBackground.vue';

const hospitals = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchHospitals = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await axios.get('https://localhost:7106/api/Hospital/GetAllReciepentsOfHospital');
    hospitals.value = response.data;
  } catch (err) {
    console.error('Error fetching hospitals:', err);
    error.value = 'Failed to load hospitals. Please try again later.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchHospitals();
});

const continueToHospital = (hospitalId) => {
  // Handle continue action based on which hospital was selected
  console.log(`Continuing to hospital with ID: ${hospitalId}`);
  // You can add navigation logic here
};
</script>

<style scoped>
/* Additional styles if needed */
</style>