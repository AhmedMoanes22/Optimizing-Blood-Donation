<template>
  <!-- Medical Heartbeat Background -->
  <MedicalBackground />

    <!-- Blood Donation Login Terminal -->
    <div class="min-h-screen flex items-center justify-center p-4 pointer-events-none py-16">
      <div 
        ref="terminal" 
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
                <span class="animate-pulse">{{ loginMode === 'hospital' ? 'Hospital Portal' : 'User Portal' }}</span>
              </h1>
              <p class="text-red-700 font-semibold text-sm">
                🩸 {{ 
                  loginMode === 'hospital' ? 'Medical Staff Login System' : 
                  'Donate Blood or Request Donations' 
                }} 🩸
              </p>
            </div>
          </div>

          <!-- Login Mode Toggle - Two Options -->
          <div class="flex justify-center mb-6">
            <div class="relative flex items-center bg-red-100 rounded-full p-1 w-full max-w-sm mx-auto">
              <button
                @click="setLoginMode('hospital')"
                :class="[
                  'px-3 py-2 rounded-full text-xs font-semibold transition-all duration-300 z-10 flex-1 text-center',
                  loginMode === 'hospital' ? 'bg-white text-red-600 shadow-md' : 'text-red-700 hover:text-red-800'
                ]"
              >
                Hospital
              </button>
              <button
                @click="setLoginMode('user')"
                :class="[
                  'px-3 py-2 rounded-full text-xs font-semibold transition-all duration-300 z-10 flex-1 text-center',
                  loginMode === 'user' ? 'bg-white text-red-600 shadow-md' : 'text-red-700 hover:text-red-800'
                ]"
              >
                User
              </button>
              <div 
                class="absolute top-0 bottom-0 left-0 bg-white rounded-full shadow-md transition-all duration-300"
                :style="{
                  width: '50%',
                  transform: loginMode === 'user' ? 'translateX(100%)' : ''
                }"
              ></div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-red-800 font-semibold">{{ error }}</p>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="success" class="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-green-800 font-semibold">{{ success }}</p>
            </div>
          </div>

          <!-- User Info Display (when logged in) -->
          <div v-if="userInfo" class="mb-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div class="space-y-2">
              <p class="text-sm text-blue-800"><strong>Welcome:</strong> {{ userInfo.name }}</p>
              <p class="text-sm text-blue-800"><strong>Role:</strong> {{ userInfo.role }}</p>
              <p class="text-sm text-blue-800"><strong>Email:</strong> {{ userInfo.email }}</p>
              <button 
                @click="handleLogout"
                class="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="space-y-6" v-if="!userInfo">
            <!-- Username Field -->
            <div class="relative group">
              <label class="block text-red-700 font-semibold text-sm mb-2">
                {{ 
                  loginMode === 'hospital' ? 'Hospital Username' : 'Username' 
                }}
              </label>
              <div class="relative">
                <input 
                  v-model="loginForm.userName" 
                  type="text"
                  required
                  class="w-full bg-red-50/70 border-2 border-red-200 text-red-900 px-4 py-3 focus:outline-none focus:border-red-400 transition-all duration-500 placeholder-red-400 rounded-lg"
                  :placeholder="
                    loginMode === 'hospital' ? 'Hospital1' : 'Enter your username'
                  "
                />
                <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400 origin-left scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-700"></div>
              </div>
            </div>

            <!-- Password Field -->
            <div class="relative group">
              <label class="block text-red-700 font-semibold text-sm mb-2">Password</label>
              <div class="relative">
                <input 
                  v-model="loginForm.password" 
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full bg-red-50/70 border-2 border-red-200 text-red-900 px-4 py-3 focus:outline-none focus:border-red-400 transition-all duration-500 placeholder-red-400 rounded-lg pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
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
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <label class="relative inline-flex items-start cursor-pointer">
                  <input type="checkbox" v-model="loginForm.rememberMe" class="sr-only peer">
                  <div class="w-14 h-8 bg-red-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-400 peer-checked:border-red-400 border border-red-300"></div>
                  <span class="ml-3 text-sm text-red-700">
                    Remember me
                  </span>
                </label>
              </div>

              <button 
                type="button"
                class="text-sm text-red-600 hover:text-red-800 underline underline-offset-4 transition-colors duration-300 font-semibold focus:outline-none"
              >
                Forgot password?
              </button>
            </div>

            <!-- Login Button -->
            <div class="mt-8 pt-4">
              <button 
                type="submit"
                :disabled="loading"
                class="relative w-full px-8 py-4 bg-gradient-to-r from-red-500 to-red-400 text-white font-bold rounded-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-red-400/25 hover:from-red-600 hover:to-red-500"
              >
                <span class="relative z-10 flex items-center justify-center">
                  <span v-if="!loading" class="flex items-center">
                    🩸 {{ 
                      loginMode === 'hospital' ? 'Login as Hospital' : 'Login as User' 
                    }}
                  </span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </span>
                </span>
                <!-- Button glow effect -->
                <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <!-- Registration Link -->
              <div class="mt-6 text-center">
                <p class="text-red-600 text-sm">
                  Don't have an account?
                  <router-link to="/sign-up" 
                    @click="switchToRegister"
                    class="text-red-700 hover:text-red-800 underline underline-offset-4 ml-1 transition-colors duration-300 font-semibold focus:outline-none"
                  >
                    Register here
                  </router-link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import MedicalBackground from '@/components/MedicalBackground.vue'

// Reactive data
const loginForm = ref({
  userName: '',
  password: '',
  rememberMe: false
})

const loading = ref(false)
const error = ref('')
const success = ref('')
const showPassword = ref(false)
const loginMode = ref('hospital') // Default to hospital
const userInfo = ref(null) // Store user info after login

// Set login mode and clear form
const setLoginMode = (mode) => {
  loginMode.value = mode
  // Clear form when switching modes
  loginForm.value = {
    userName: '',
    password: '',
    rememberMe: false
  }
  error.value = ''
  success.value = ''
}

// Navigate to registration (placeholder function)
const switchToRegister = () => {
  console.log(`Navigating to registration for ${loginMode.value}`)
  // You would implement router navigation here
}

// Login function matching your exact API
const handleLogin = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    
    //Make the exact API call to your endpoint
    const response = await axios.post('https://localhost:7106/api/Account/login', {
      userName: loginForm.value.userName,
      password: loginForm.value.password,
      rememberMe: loginForm.value.rememberMe
    })

    // Handle successful login based on your API response structure
    if (response.data && response.data.token) {
      success.value = `Welcome ${response.data.name}! Login successful.`
      
      // Store user info from the response
      userInfo.value = {
        id: response.data.id,
        name: response.data.name,
        userName: response.data.userName,
        email: response.data.email,
        address: response.data.address,
        phoneNumber: response.data.phoneNumber,
        role: response.data.role,
        token: response.data.token,
        expiration: response.data.expiration
      }
      
      // Store token in localStorage for future authenticated requests
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
      
      console.log('Login successful:', response.data)
      
      // Here you would typically redirect based on role:
      // if (response.data.role === 'Hospital') router.push('/hospital-dashboard')
      // else router.push('/user-dashboard')
      
    } else {
      throw new Error('Invalid response from server')
    }
    
  } catch (err) {
    console.error('Login error:', err)
    
    // Handle different types of errors
    if (err.response) {
      // Server responded with error status
      const status = err.response.status
      const message = err.response.data?.message || err.response.data || 'Login failed'
      
      if (status === 401) {
        error.value = 'Invalid username or password. Please check your credentials.'
      } else if (status === 400) {
        error.value = 'Invalid request. Please check your input.'
      } else if (status === 500) {
        error.value = 'Server error. Please try again later.'
      } else {
        error.value = `Login failed: ${message}`
      }
    } else if (err.request) {
      // Network error
      error.value = 'Unable to connect to server. Please check your internet connection and try again.'
    } else {
      // Other errors
      error.value = err.message || 'An unexpected error occurred. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

// Logout function matching your API
const handleLogout = async () => {
  try {
    // Call logout API
    await axios.post('https://localhost:7106/api/Account/logout', {}, {
      headers: {
        'Authorization': `Bearer ${userInfo.value.token}`
      }
    })
    
    // Clear stored data
    localStorage.removeItem('authToken')
    localStorage.removeItem('userInfo')
    userInfo.value = null
    
    success.value = 'Logged out successfully'
    
    // Clear form
    loginForm.value = {
      userName: '',
      password: '',
      rememberMe: false
    }
    
  } catch (err) {
    console.error('Logout error:', err)
    // Clear local data even if API call fails
    localStorage.removeItem('authToken')
    localStorage.removeItem('userInfo')
    userInfo.value = null
    error.value = 'Logout completed (with errors)'
  }
}

// Check if user is already logged in on component mount
const checkExistingLogin = () => {
  const storedUserInfo = localStorage.getItem('userInfo')
  const storedToken = localStorage.getItem('authToken')
  
  if (storedUserInfo && storedToken) {
    try {
      userInfo.value = JSON.parse(storedUserInfo)
      // You might want to verify the token is still valid here
    } catch (err) {
      console.error('Error parsing stored user info:', err)
      localStorage.removeItem('userInfo')
      localStorage.removeItem('authToken')
    }
  }
}

// Check for existing login on component mount
checkExistingLogin()
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

/* Additional medical-themed styling */
.medical-cross {
  filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.3));
}

/* Enhanced focus states */
input:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>