<template>
  <MedicalBackground />
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Section Header -->
        <div class="bg-gradient-to-r from-red-500 to-pink-500 px-8 py-6">
          <h2 class="text-3xl font-bold text-white text-center">The Requests</h2>
          <div class="mt-4 max-w-md mx-auto">
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search patients..."
                class="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
              <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="p-8 text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
          <p class="mt-4 text-gray-600">Loading patient data...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="p-8 text-center">
          <div class="text-red-500 mb-4">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <p class="text-lg text-gray-800">{{ error }}</p>
          <button @click="fetchPatients" class="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            Retry
          </button>
        </div>

        <!-- Patient List -->
        <div v-else class="p-8">
          <div v-if="filteredPatients.length === 0" class="text-center py-12">
            <p class="text-gray-500 text-lg">No patients found matching your search.</p>
          </div>
          
          <div v-else class="space-y-6">
            <div 
              v-for="patient in filteredPatients" 
              :key="patient.id"
              class="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4"
              :class="getPriorityBorderColor(patient.condition)"
              @click="selectPatient(patient)"
            >
              <div class="flex items-center p-6 cursor-pointer">
                <!-- Avatar -->
                <div class="flex-shrink-0 mr-6">
                  <div 
                    class="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                    :class="getAvatarColor(patient.gender)"
                  >
                    {{ patient.id }}
                  </div>
                </div>

                <!-- Patient Info -->
                <div class="flex-1">
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="text-xl font-bold text-gray-800 mb-2">{{ patient.name }}</h3>
                      <div class="space-y-2">
                        <div class="flex items-center text-gray-600">
                          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
                          </svg>
                          <span class="text-sm">{{ patient.address }}</span>
                        </div>
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                          </svg>
                          <span class="text-sm font-medium capitalize">{{ patient.condition }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- Priority Badge -->
                    <div 
                      class="px-3 py-1 rounded-full text-xs font-bold text-white"
                      :class="getPriorityColor(patient.condition)"
                    >
                      {{ getPriorityLevel(patient.condition) }}
                    </div>
                  </div>
                </div>

                <!-- Action Button -->
                <div class="flex-shrink-0 ml-4">
                  <button class="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Patient Details Modal -->
      <div v-if="selectedPatient" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all" @click.stop>
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl font-bold text-gray-800">Patient Details</h3>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <p class="text-lg text-gray-900">{{ selectedPatient.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Gender</label>
                <p class="text-lg text-gray-900 capitalize">{{ selectedPatient.gender }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Address</label>
                <p class="text-lg text-gray-900">{{ selectedPatient.address }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Condition</label>
                <p class="text-lg text-gray-900 capitalize">{{ selectedPatient.condition }}</p>
              </div>
            </div>

            <div class="mt-6 flex space-x-3">
              <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
                Admit Patient
              </button>
              <button class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors duration-200">
                Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Header from "@/components/HeaderSection.vue";
import MedicalBackground from '@/components/MedicalBackground.vue'

const selectedPatient = ref(null)
const searchQuery = ref('')
const loading = ref(false)
const error = ref(null)
const patients = ref([])

// Fetch patients from API
const fetchPatients = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get('https://localhost:7106/api/RequestBlood/GetAllRequestsByUser')
    
    // Assuming the API returns an array of patients
    patients.value = response.data.map(patient => ({
      id: patient.id,
      name: patient.fullName || 'Unknown',
      gender: patient.gender?.toLowerCase() || 'unknown',
      address: patient.address || 'Address not provided',
      condition: patient.medicalCondition?.toLowerCase() || 'unknown condition'
    }))
    
  } catch (err) {
    console.error('Error fetching patients:', err)
    error.value = 'Failed to load patient data. Please try again later.'
  } finally {
    loading.value = false
  }
}

// Fetch data when component mounts
onMounted(() => {
  fetchPatients()
})

const filteredPatients = computed(() => {
  if (!searchQuery.value) return patients.value;
  return patients.value.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    patient.address.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectPatient = (patient) => {
  selectedPatient.value = patient
}

const closeModal = () => {
  selectedPatient.value = null
}

const getAvatarColor = (gender) => {
  return gender === 'male' 
    ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
    : gender === 'female'
    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
    : 'bg-gradient-to-br from-gray-500 to-gray-600'
}

const getPriorityColor = (condition) => {
  const priorities = {
    'blood cancer': 'bg-gradient-to-r from-red-500 to-red-600',
    'kidney failure': 'bg-gradient-to-r from-red-600 to-red-700',
    'brain cancer': 'bg-gradient-to-r from-red-600 to-red-700',
    'on dialysis': 'bg-gradient-to-r from-amber-500 to-orange-500'
  }
  return priorities[condition] || 'bg-gradient-to-r from-gray-500 to-gray-600'
}

const getPriorityBorderColor = (condition) => {
  const priorities = {
    'blood cancer': 'border-red-500',
    'kidney failure': 'border-red-600',
    'brain cancer': 'border-red-600',
    'on dialysis': 'border-amber-500'
  }
  return priorities[condition] || 'border-gray-500'
}

const getPriorityLevel = (condition) => {
  const levels = {
    'blood cancer': 'CRITICAL',
    'kidney failure': 'CRITICAL',
    'brain cancer': 'CRITICAL',
    'on dialysis': 'HIGH PRIORITY'
  }
  return levels[condition] || 'NORMAL'
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>