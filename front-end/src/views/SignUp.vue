<template>
  <!-- Medical Heartbeat Background -->
  <MedicalBackground />

  <!-- Blood Donation Registration Terminal -->
  <div class="min-h-screen flex items-center justify-center p-4 pointer-events-none py-16">
    <div 
      class="relative w-full max-w-md bg-white/95 backdrop-blur-3xl border-2 border-red-300/50 rounded-2xl overflow-hidden transform-gpu transition-transform duration-300 shadow-2xl shadow-red-500/20 my-8"
      style="transform-style: preserve-3d;"
    >
      <!-- Animated Border Effects -->
      <div class="absolute inset-0 rounded-2xl">
        <!-- Top border glow -->
        <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent animate-pulse"></div>
        <!-- Right border glow -->
        <div class="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-400/40 to-transparent" style="animation: pulse 2s infinite 0.5s;"></div>
        <!-- Bottom border glow -->
        <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent" style="animation: pulse 2s infinite 1s;"></div>
        <!-- Left border glow -->
        <div class="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-400/40 to-transparent" style="animation: pulse 2s infinite 1.5s;"></div>
      </div>

      <!-- Background Pattern Overlay -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: radial-gradient(red 1px, transparent 1px); background-size: 20px 20px;"></div>
      </div>

      <!-- Main Interface -->
      <div class="relative flex flex-col p-8 z-10 pointer-events-auto">
        <!-- Medical Header -->
        <div class="flex flex-col items-center gap-4 mb-8">
          <div class="relative">
            <!-- Medical Cross Icon -->
            <div class="w-20 h-20 rounded-full border-4 border-red-400/60 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
              <div class="w-8 h-8 relative">
                <div class="absolute top-0 left-1/2 w-2 h-8 bg-red-500 transform -translate-x-1/2 rounded-full"></div>
                <div class="absolute top-1/2 left-0 w-8 h-2 bg-red-500 transform -translate-y-1/2 rounded-full"></div>
              </div>
            </div>
            <div class="absolute -inset-2 rounded-full border-t-4 border-b-4 border-red-300/70 animate-spin" style="animation-direction: reverse; animation-duration: 4s;"></div>
          </div>
          <div class="text-center">
            <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-500 mb-2">
              <span class="animate-pulse">{{ currentConfig.title }}</span>
            </h1>
            <p class="text-red-700 font-semibold text-sm">
              🩸 {{ currentConfig.subtitle }} 🩸
            </p>
          </div>
        </div>

        <!-- User Type Toggle - Two Options -->
        <div class="flex justify-center mb-6">
          <div class="relative flex items-center bg-red-100 rounded-full p-1 w-full max-w-sm mx-auto">
            <button
              v-for="type in userTypes"
              :key="type.value"
              @click="setUserType(type.value)"
              :class="[
                'px-3 py-2 rounded-full text-xs font-semibold transition-all duration-300 z-10 flex-1 text-center',
                userType === type.value ? 'bg-white text-red-600 shadow-md' : 'text-red-700 hover:text-red-800'
              ]"
            >
              {{ type.label }}
            </button>
            <div 
              class="absolute top-0 bottom-0 left-0 bg-red rounded-full shadow-md transition-all duration-300"
              :style="{
                width: '50%',
                transform: userType === 'hospital' ? 'translateX(100%)' : ''
              }"
            ></div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="submitMessage && !submitSuccess" class="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm text-red-800 font-semibold">{{ submitMessage }}</p>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="submitMessage && submitSuccess" class="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm text-green-800 font-semibold">{{ submitMessage }}</p>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name -->
          <div class="relative group">
            <label class="block text-red-700 font-semibold text-sm mb-2">Full Name *</label>
            <div class="relative">
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full bg-red-50/70 border-2 border-red-200 text-red-900 px-4 py-3 focus:outline-none focus:border-red-400 transition-all duration-500 placeholder-red-400 rounded-lg"
                placeholder="Enter your full name"
                :class="{ 'border-red-400': errors.name }"
              />
              <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400 origin-left scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-700"></div>
            </div>
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <!-- Username -->
          <div class="relative group">
            <label class="block text-red-700 font-semibold text-sm mb-2">Username *</label>
            <div class="relative">
              <input
                v-model="form.userName"
                type="text"
                required
                class="w-full bg-red-50/70 border-2 border-red-200 text-red-900 px-4 py-3 focus:outline-none focus:border-red-400 transition-all duration-500 placeholder-red-400 rounded-lg"
                placeholder="Choose a username"
                :class="{ 'border-red-400': errors.userName }"
              />
              <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400 origin-left scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-700"></div>
            </div>
            <p v-if="errors.userName" class="text-red-500 text-sm mt-1">{{ errors.userName }}</p>
          </div>

          <!-- Email -->
          <div class="relative group">
            <label class="block text-red-700 font-semibold text-sm mb-2">Email Address *</label>
            <div class="relative">
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full bg-red-50/70 border-2 border-red-200 text-red-900 px-4 py-3 focus:outline-none focus:border-red-400 transition-all duration-500 placeholder-red-400 rounded-lg"
                placeholder="Enter your email"
                :class="{ 'border-red-400': errors.email }"
              />
              <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400 origin-left scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-700"></div>
            </div>
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div class="relative group">
            <label class="block text-red-700 font-semibold text-sm mb-2">Password *</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full bg-red-50/70 border-2 border-red-200 text-red-900 px-4 py-3 focus:outline-none focus:border-red-400 transition-all duration-500 placeholder-red-400 rounded-lg pr-12"
                placeholder="Enter your password"
                :class="{ 'border-red-400': errors.password }"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-red-400 hover:text-red-600 transition-colors"
              >
                <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              </button>
              <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400 origin-left scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-700"></div>
            </div>
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>

          <!-- Address -->
         
          <!-- Phone Number -->
          <div class="relative group">
            <label class="block text-red-700 font-semibold text-sm mb-2">Phone Number *</label>
            <div class="relative">
              <input
                v-model="form.phoneNumber"
                type="tel"
                required
                class="w-full bg-red-50/70 border-2 border-red-200 text-red-900 px-4 py-3 focus:outline-none focus:border-red-400 transition-all duration-500 placeholder-red-400 rounded-lg"
                placeholder="Enter your phone number"
                :class="{ 'border-red-400': errors.phoneNumber }"
              />
              <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400 origin-left scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-700"></div>
            </div>
            <p v-if="errors.phoneNumber" class="text-red-500 text-sm mt-1">{{ errors.phoneNumber }}</p>
          </div>

          <!-- Age and Gender Row (Only for User) -->
          <div v-if="userType === 'user'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Age -->
            <div class="relative group">
              <label class="block text-red-700 font-semibold text-sm mb-2">Age *</label>
              <div class="relative">
                <input
                  v-model.number="form.age"
                  type="number"
                  required
                  min="1"
                  max="120"
                  class="w-full bg-red-50/70 border-2 border-red-200 text-red-900 px-4 py-3 focus:outline-none focus:border-red-400 transition-all duration-500 placeholder-red-400 rounded-lg"
                  placeholder="Enter your age"
                  :class="{ 'border-red-400': errors.age }"
                />
                <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400 origin-left scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-700"></div>
              </div>
              <p v-if="errors.age" class="text-red-500 text-sm mt-1">{{ errors.age }}</p>
            </div>

            <!-- Gender -->
            <div class="relative group">
              <label class="block text-red-700 font-semibold text-sm mb-2">Gender *</label>
              <div class="relative">
                <select
                  v-model.number="form.gender"
                  required
                  class="w-full bg-red-50/70 border-2 border-red-200 text-red-900 px-4 py-3 focus:outline-none focus:border-red-400 transition-all duration-500 rounded-lg appearance-none"
                  :class="{ 'border-red-400': errors.gender }"
                >
                  <option value="" disabled class="text-gray-800">Select Gender</option>
                  <option value="0" class="text-gray-800">Male</option>
                  <option value="1" class="text-gray-800">Female</option>
                </select>
                <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400 origin-left scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-700"></div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p v-if="errors.gender" class="text-red-500 text-sm mt-1">{{ errors.gender }}</p>
            </div>
          </div>

         

          <!-- Submit Button -->
          <div class="mt-8 pt-4">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="relative w-full px-8 py-4 bg-gradient-to-r from-red-500 to-red-400 text-white font-bold rounded-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-red-400/25 hover:from-red-600 hover:to-red-500"
            >
              <span class="relative z-10 flex items-center justify-center">
                <span v-if="!isSubmitting" class="flex items-center">
                  🩸 {{ currentConfig.buttonText }}
                </span>
                <span v-else class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              </span>
              <!-- Button glow effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </form>

        <!-- Response Preview -->
        <div v-if="responseData" class="mt-6 p-4 bg-gray-900/50 rounded-lg">
          <h3 class="text-white font-medium mb-2">Registration Response:</h3>
          <pre class="text-green-300 text-sm overflow-x-auto">{{ JSON.stringify(responseData, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import axios from 'axios'
import MedicalBackground from '@/components/MedicalBackground.vue'

// User Types Configuration
const userTypes = ref([
  { 
    value: 'user', 
    label: 'User'
  },
  { 
    value: 'hospital', 
    label: 'Hospital'
  }
])

const userType = ref('user')

const userTypeConfigs = {
  user: {
    title: 'User Registration',
    subtitle: 'Join our blood donation network',
    buttonText: 'Register as User',
    endpoint: 'register-user'
  },
  hospital: {
    title: 'Hospital Registration',
    subtitle: 'Register your medical facility',
    buttonText: 'Register Hospital',
    endpoint: 'register-hospital'
  }
}

const currentConfig = computed(() => userTypeConfigs[userType.value])

// Reactive form data
const form = reactive({
  name: '',
  userName: '',
  email: '',
  password: '',
  address: '',
  phoneNumber: '',
  age: '',
  gender: '',
  blood: ''
})

// Reactive state
const errors = reactive({})
const isSubmitting = ref(false)
const showPassword = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)
const responseData = ref(null)

// Blood type mapping
const bloodTypeMap = {
  0: 'A_Positive',
  1: 'A_Negative',
  2: 'B_Positive',
  3: 'B_Negative',
  4: 'AB_Positive',
  5: 'AB_Negative',
  6: 'O_Positive',
  7: 'O_Negative'
}

// Set user type and reset form
const setUserType = (type) => {
  userType.value = type
  resetForm()
}

// Validation function
const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])
  
  let isValid = true

  // Name validation
  if (!form.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  } else if (form.name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
    isValid = false
  }

  // Username validation
  if (!form.userName.trim()) {
    errors.userName = 'Username is required'
    isValid = false
  } else if (form.userName.length < 3) {
    errors.userName = 'Username must be at least 3 characters'
    isValid = false
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Password validation
  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    isValid = false
  }

  // Address validation
  if (!form.address.trim()) {
    errors.address = 'Address is required'
    isValid = false
  }

  // Phone validation
  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required'
    isValid = false
  }

  // Age, Gender and Blood validation (only for user)
  if (userType.value === 'user') {
    if (!form.age) {
      errors.age = 'Age is required'
      isValid = false
    } else if (form.age < 1 || form.age > 120) {
      errors.age = 'Please enter a valid age'
      isValid = false
    }

    if (form.gender === '') {
      errors.gender = 'Gender is required'
      isValid = false
    }

    if (form.blood === '') {
      errors.blood = 'Blood type is required'
      isValid = false
    }
  }

  return isValid
}

// API call using axios
const registerUser = async (formData) => {
  try {
    const response = await axios.post(
      `https://localhost:7106/api/Account/${currentConfig.value.endpoint}`, 
      formData, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000 // 10 second timeout
      }
    )
    
    return response.data
  } catch (error) {
    console.error('Registration API error:', error)
    
    if (error.response) {
      // Server responded with error status
      throw new Error(`Registration failed: ${error.response.data?.message || error.response.statusText}`)
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error. Please check your connection.')
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred.')
    }
  }
}

// Mock API call for testing
const mockApiCall = async (formData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Mock response matching your API structure
  const mockResponse = {
    ...formData
  }

  // Add gender and blood type text for user
  if (userType.value === 'user') {
    mockResponse.genderText = formData.gender === 0 ? 'Male' : 'Female'
    mockResponse.bloodTypeText = bloodTypeMap[formData.blood] || 'Unknown'
  }
  
  return mockResponse
}

// Form submission handler
const handleSubmit = async () => {
  submitMessage.value = ''
  responseData.value = null

  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Prepare form data based on user type
    const formData = {
      name: form.name,
      userName: form.userName,
      email: form.email,
      password: form.password,
      address: form.address,
      phoneNumber: form.phoneNumber
    }

    // Add age, gender, and blood for user
    if (userType.value === 'user') {
      formData.age = form.age
      formData.gender = form.gender
      formData.blood = form.blood
    }

    // Use mockApiCall for testing, replace with registerUser for production
    const response = await mockApiCall(formData)
    // const response = await registerUser(formData)
    
    responseData.value = response
    submitMessage.value = `Registration successful! Welcome to our platform as a ${userType.value}.`
    submitSuccess.value = true
    
    // Reset form after successful submission
    setTimeout(() => {
      resetForm()
    }, 3000)

  } catch (error) {
    submitMessage.value = error.message || 'Registration failed. Please try again.'
    submitSuccess.value = false
    console.error('Registration error:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Reset form
const resetForm = () => {
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
  Object.keys(errors).forEach(key => delete errors[key])
  submitMessage.value = ''
  responseData.value = null
}
</script>

<style scoped>
/* Custom animations and effects */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Enhanced focus states */
input:focus, select:focus, textarea:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom select dropdown arrow */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ef4444' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
</style>