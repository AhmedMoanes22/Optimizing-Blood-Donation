<template>
  <div class="min-h-screen text-gray-700 bg-white relative overflow-hidden">
    <!-- Animated background elements -->
    <MedicalBackground />
    <!-- Header -->
    <Header />
    <!-- Main Content -->
    <main class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <!-- Header section -->
        <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div class="relative z-10 text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down">
              Find Specialized Care
            </h1>
            <p class="text-xl opacity-90 animate-fade-in-up delay-300">
              Connect with the right hospital for your health needs
            </p>
          </div>
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
          <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        </div>

        <form @submit.prevent="handleSubmit" class="p-8 space-y-8">
          <!-- Progress indicator -->
          <div class="flex justify-center mb-8">
            <div class="flex items-center space-x-4">
              <div v-for="(step, index) in progressSteps" :key="index" 
                   :class="[
                     'w-3 h-3 rounded-full transition-all duration-500 ease-out',
                     index <= currentStep ? 'bg-blue-500 scale-125 shadow-lg' : 'bg-gray-300 scale-100'
                   ]"></div>
            </div>
          </div>

          <!-- Blood Type Selection -->
          <div :class="[
            'bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
            isVisible ? 'animate-slide-in-left opacity-100' : 'opacity-0 translate-x-8'
          ]">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <span class="text-2xl">🩸</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-800">Patient Blood Type</h3>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button 
                v-for="bloodType in bloodTypes"
                :key="bloodType"
                type="button" 
                @click="selectBloodType(bloodType)"
                :class="[
                  'relative group bg-white/70 border-2 rounded-xl p-4 font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm overflow-hidden',
                  selectedBloodType === bloodType 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-transparent shadow-lg transform -translate-y-1' 
                    : 'border-red-200 text-red-600 hover:border-red-500'
                ]"
              >
                <span class="relative z-10">{{ bloodType }}</span>
                <div v-if="selectedBloodType !== bloodType" class="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          <!-- Personal Information Grid -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Full Name -->
            <div :class="[
              'bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
              isVisible ? 'animate-slide-in-left opacity-100' : 'opacity-0 translate-x-8'
            ]">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-2xl">👤</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-800">Full Name</h3>
              </div>
              <div class="relative">
                <input 
                  type="text" 
                  v-model="donorData.fullName"
                  @input="updateProgress"
                  placeholder="Enter patient's full name"
                  class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg backdrop-blur-sm focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
            </div>

            <!-- Age -->
            <div :class="[
              'bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
              isVisible ? 'animate-slide-in-right opacity-100' : 'opacity-0 -translate-x-8'
            ]">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-2xl">📅</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-800">Patient Age</h3>
              </div>
              <div class="relative">
                <input 
                  type="number" 
                  v-model="donorData.age"
                  @input="updateProgress"
                  placeholder="Enter age"
                  min="0" 
                  max="120"
                  class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg backdrop-blur-sm focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Gender Selection -->
          <div :class="[
            'bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
            isVisible ? 'animate-slide-in-left opacity-100' : 'opacity-0 translate-x-8'
          ]">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                <span class="text-2xl">⚥</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-800">Patient Gender</h3>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <button 
                v-for="gender in genders"
                :key="gender.value"
                type="button"
                @click="selectGender(gender.value)"
                :class="[
                  'relative group bg-white/70 border-2 rounded-xl p-6 font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm overflow-hidden',
                  selectedGender === gender.value 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg transform -translate-y-1' 
                    : 'border-blue-200 text-blue-600 hover:border-blue-500'
                ]"
              >
                <span class="relative z-10 flex items-center justify-center space-x-2">
                  <span>{{ gender.icon }}</span>
                  <span>{{ gender.label }}</span>
                </span>
                <div v-if="selectedGender !== gender.value" class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          <!-- Contact Information -->
          <div :class="[
            'bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
            isVisible ? 'animate-slide-in-right opacity-100' : 'opacity-0 -translate-x-8'
          ]">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <span class="text-2xl">📧</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-800">Contact Email</h3>
            </div>
            <div class="relative">
              <input 
                type="email" 
                v-model="donorData.email"
                @input="updateProgress"
                placeholder="your.email@example.com"
                class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg backdrop-blur-sm focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>

          <!-- Health Condition -->
          <div :class="[
            'bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
            isVisible ? 'animate-slide-in-left opacity-100' : 'opacity-0 translate-x-8'
          ]">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <span class="text-2xl">🏥</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-800">Health Condition</h3>
            </div>
            <div class="relative">
              <textarea 
                v-model="donorData.healthCondition"
                @input="updateProgress"
                placeholder="Describe the health condition or reason for hospital search..."
                rows="4"
                class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg backdrop-blur-sm resize-none focus:ring-2 focus:ring-blue-200"
                required
              ></textarea>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-6">
            <button 
              type="submit"
              :disabled="isSubmitting"
              class="relative w-full py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
            >
              <span class="relative z-10 flex items-center justify-center space-x-3">
                <span v-if="!isSubmitting">🔍</span>
                <span v-else class="inline-block animate-spin">⏳</span>
                <span>{{ isSubmitting ? 'Searching...' : 'Find Blood' }}</span>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-300 group-hover:scale-105"></div>
              <div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Header from "@/components/HeaderSection.vue";
import MedicalBackground from '@/components/MedicalBackground.vue'
const router = useRouter()

const donorData = reactive({
  fullName: '',
  age: '',
  email: '',
  healthCondition: ''
})

const selectedBloodType = ref(null)
const selectedGender = ref(null)
const isSubmitting = ref(false)
const isVisible = ref(false)
const currentStep = ref(0)

const progressSteps = ['Blood Type', 'Personal Info', 'Health Details', 'Submit']

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const genders = [
  { value: 'male', label: 'Male', icon: '👨' },
  { value: 'female', label: 'Female', icon: '👩' }
]

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const selectBloodType = (type) => {
  selectedBloodType.value = type
  updateProgress()
}

const selectGender = (gender) => {
  selectedGender.value = gender
  updateProgress()
}

const updateProgress = () => {
  let step = 0
  if (selectedBloodType.value) step = 1
  if (donorData.fullName && donorData.age) step = 2
  if (donorData.email && donorData.healthCondition) step = 3
  currentStep.value = step
}

watch(donorData, () => {
  updateProgress()
}, { deep: true })

const handleSubmit = async () => {
  if (!selectedBloodType.value) {
    alert('Please select a blood type')
    return
  }
  
  if (!selectedGender.value) {
    alert('Please select a gender')
    return
  }
  
  isSubmitting.value = true
  
  try {
    const hospitalSearchData = {
      bloodType: selectedBloodType.value,
      fullName: donorData.fullName,
      gender: selectedGender.value,
      age: donorData.age,
      email: donorData.email,
      healthCondition: donorData.healthCondition,
      timestamp: new Date().toISOString()
    }
    
    // Store data in localStorage
    localStorage.setItem('DonorSearchData', JSON.stringify(hospitalSearchData))
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate to results page
    router.push({
      name: 'BloodMap',
      query: { 
        bloodType: selectedBloodType.value,
        condition: encodeURIComponent(donorData.healthCondition)
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error processing your request. Please try again.');
  } finally {
    isSubmitting.value = false
  }
}
</script>