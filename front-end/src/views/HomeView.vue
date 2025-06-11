<template>
  <div class="bg-gradient-to-br from-slate-50 via-red-50 to-pink-50 min-h-screen flex flex-col relative overflow-hidden">
    <!-- Full-width Header -->
      <MedicalBackground />
    <Header />

    <div class="max-w-7xl mx-auto flex-grow w-full relative z-10">
      <!-- Enhanced Hero Section -->
      <section class="relative mb-12">
        <div class="relative h-96 rounded-3xl mx-6 overflow-hidden shadow-2xl">
          <div class="absolute inset-0 bg-gradient-to-r from-red-600/90 via-red-700/80 to-red-800/90"></div>
          <img alt="Blood donation - hands giving and receiving" 
               class="w-full h-full object-cover" 
               src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop&q=80"/>
          
          <div class="absolute inset-0 flex items-center">
            <div class="w-full max-w-2xl ml-12 transform transition-all duration-1000" 
                 :class="{ 'translate-x-0 opacity-100': isVisible, 'translate-x-full opacity-0': !isVisible }">
              <div class="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
                <h1 class="text-6xl font-black text-red-700 mb-6 leading-tight">
                  Blood
                  <span class="block text-4xl font-bold text-gray-800 mt-2">Donation Saves Lives</span>
                </h1>
                <p class="text-xl text-gray-700 leading-relaxed mb-6">
                  Your blood can save lives. From how it works to who needs it, there's a lot to learn about blood donation.
                </p>
                <div class="flex gap-4">
                  <button class="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-red-500/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    Donate Now
                  </button>
                  <button class="border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-600 hover:text-white transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Enhanced Stats Section -->
      <section class="px-6 mb-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(stat, index) in stats" :key="index"
               class="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
               :class="{ 'animate-fadeInUp': isVisible }"
               :style="{ animationDelay: `${index * 200}ms` }">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <i :class="stat.icon" class="text-white text-2xl"></i>
            </div>
            <h3 class="text-3xl font-black text-red-700 mb-2">{{ stat.number }}</h3>
            <p class="text-gray-600 font-semibold">{{ stat.label }}</p>
          </div>
        </div>
      </section>
      
      <!-- Blood Donation Process Gallery -->
      <section class="px-6 mb-12">
        <h2 class="text-4xl font-black text-center text-gray-800 mb-2">
          The <span class="text-red-600">Donation Process</span>
        </h2>
        <p class="text-center text-gray-600 mb-8 text-lg">Simple steps that save lives</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105">
            <img alt="Blood donation registration process" 
                 class="w-full h-48 object-cover" 
                 src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop&q=80"/>
            <div class="p-6">
              <h3 class="text-xl font-bold text-red-700 mb-2">1. Registration</h3>
              <p class="text-gray-600">Quick and easy registration process</p>
            </div>
          </div>
          
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105">
            <img alt="Medical screening for blood donation" 
                 class="w-full h-48 object-cover" 
                 src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop&q=80"/>
            <div class="p-6">
              <h3 class="text-xl font-bold text-red-700 mb-2">2. Health Check</h3>
              <p class="text-gray-600">Brief medical screening and health assessment</p>
            </div>
          </div>
          
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105">
            <img alt="Blood donation procedure" 
                 class="w-full h-48 object-cover" 
                 src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop&q=80"/>
            <div class="p-6">
              <h3 class="text-xl font-bold text-red-700 mb-2">3. Donation</h3>
              <p class="text-gray-600">Safe and comfortable donation process</p>
            </div>
          </div>
          
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105">
            <img alt="Post-donation refreshments and care" 
                 class="w-full h-48 object-cover" 
                 src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop&q=80"/>
            <div class="p-6">
              <h3 class="text-xl font-bold text-red-700 mb-2">4. Recovery</h3>
              <p class="text-gray-600">Rest and refreshments after donation</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Enhanced Information Section -->
      <section class="bg-white/60 backdrop-blur-sm mx-6 p-8 rounded-3xl shadow-xl border border-white/20 mb-12">
        <div class="flex flex-col lg:flex-row items-center gap-8">
          <div class="lg:w-1/2 grid grid-cols-2 gap-4">
            <div class="relative">
              <img alt="Blood bags and medical equipment" 
                   class="w-full h-40 object-cover rounded-xl shadow-lg" 
                   src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=250&h=160&fit=crop&q=80"/>
              <div class="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent rounded-xl"></div>
            </div>
            <div class="relative">
              <img alt="Blood donation center" 
                   class="w-full h-40 object-cover rounded-xl shadow-lg" 
                   src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=250&h=160&fit=crop&q=80"/>
              <div class="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent rounded-xl"></div>
            </div>
            <div class="relative col-span-2">
              <img alt="Healthcare workers preparing blood donation" 
                   class="w-full h-32 object-cover rounded-xl shadow-lg" 
                   src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=130&fit=crop&q=80"/>
              <div class="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent rounded-xl"></div>
            </div>
          </div>
          <div class="lg:w-1/2 space-y-6">
            <h2 class="text-4xl font-black text-gray-800 mb-4">
              Why <span class="text-red-600">Donate Blood?</span>
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              The Blood Bank was created to serve as a platform to educate and encourage those who can to donate. 
              Our website acts as a central portal, providing comprehensive information about what giving blood entails.
            </p>
            <div class="grid grid-cols-2 gap-4 mt-6">
              <div class="bg-red-50 p-4 rounded-xl">
                <h4 class="font-bold text-red-700 mb-2">Safe Process</h4>
                <p class="text-sm text-gray-600">Completely safe and sterile donation process</p>
              </div>
              <div class="bg-red-50 p-4 rounded-xl">
                <h4 class="font-bold text-red-700 mb-2">Quick & Easy</h4>
                <p class="text-sm text-gray-600">Takes only 10-15 minutes of your time</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <!-- Enhanced Footer -->
    <footer class="bg-gradient-to-r from-red-700 via-red-800 to-red-900 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="relative max-w-7xl mx-auto p-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-8">
          <div class="text-center lg:text-left">
            <p class="text-3xl font-black mb-4">
              Together, we're <span class="text-yellow-300">Lifeblood</span>
            </p>
            <div class="flex justify-center lg:justify-start space-x-6">
              <a v-for="social in socialLinks" :key="social.name"
                 :href="social.url" 
                 class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                <i :class="social.icon" class="text-xl"></i>
              </a>
            </div>
          </div>
          
          <div class="text-center">
            <div class="w-32 h-20 mx-auto bg-white/10 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
              <img alt="World Blood Donor Day logo" 
                   class="w-full h-full object-cover" 
                   src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=130&h=80&fit=crop&q=80"/>
            </div>
          </div>
          
          <div class="text-center lg:text-right">
            <p class="text-3xl font-black mb-2 text-yellow-300">
              Call 15366
            </p>
            <p class="text-lg opacity-90">24/7 Emergency Support</p>
          </div>
        </div>
        
        <div class="flex justify-center space-x-6 pt-8 border-t border-white/20">
          <RouterLink to="/login" 
                       class="bg-white text-red-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Login
          </RouterLink>
          <RouterLink to="/sign-up" 
                       class="border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white hover:text-red-700 transition-all duration-300 transform hover:scale-105">
            Sign Up
          </RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from "@/components/HeaderSection.vue";
import { RouterLink } from 'vue-router'
import MedicalBackground from '@/components/MedicalBackground.vue'
const isVisible = ref(false)
    
const stats = ref([
  { number: '1M+', label: 'Lives Saved', icon: 'fas fa-heart' },
  { number: '50K+', label: 'Active Donors', icon: 'fas fa-users' },
  { number: '24/7', label: 'Emergency Support', icon: 'fas fa-phone' }
])
    
const socialLinks = ref([
  { name: 'Facebook', icon: 'fab fa-facebook-f', url: '#' },
  { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
  { name: 'Instagram', icon: 'fab fa-instagram', url: '#' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' },
  { name: 'YouTube', icon: 'fab fa-youtube', url: '#' }
])
    
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<style scoped>
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInLeft {
  animation: fadeInLeft 0.8s ease-out forwards;
}

.animate-fadeInRight {
  animation: fadeInRight 0.8s ease-out forwards;
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

html, body {
  height: 100%;
  margin: 0;
}
</style>