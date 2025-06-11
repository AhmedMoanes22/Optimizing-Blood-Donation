<template>
  <div class="w-full max-w-6xl mx-auto overflow-x-hidden">
    <!-- Card Container with fixed dimensions -->
    <div 
      ref="cardRef"
      class="w-full h-[600px] bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 group hover:-translate-y-2 relative overflow-hidden flex flex-col md:flex-row gap-8"
    >
      <!-- Animated Background Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <!-- Floating Particles Animation -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-60 top-[20%] left-[20%] animate-bounce delay-0"></div>
        <div class="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-60 top-[60%] right-[20%] animate-bounce" style="animation-delay: 500ms;"></div>
        <div class="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-60 bottom-[20%] left-[60%] animate-bounce" style="animation-delay: 1000ms;"></div>
      </div>

      <!-- Product Image Section - Left Side -->
      <div class="relative w-full md:w-1/2 flex flex-col justify-center z-10">
        <div class="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 overflow-hidden relative group-hover:shadow-inner transition-all duration-500">
          <img 
            :src="image"
            class="w-full h-full object-contain group-hover:scale-110 transition-all duration-700 filter group-hover:brightness-110" 
            :alt="title"
          />
          <!-- Shimmer effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
        </div>
        
        <!-- Animated Stock Badge -->
        <div class="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform group-hover:scale-110 transition-all duration-300">
          <span class="flex items-center gap-1">
            <span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            In Stock
          </span>
        </div>

        <!-- Floating Icons Animation -->
        <div class="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-4">
          <div class="flex gap-2">
            <div class="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
              <span class="text-red-500 text-sm">❤️</span>
            </div>
            <div class="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
              <span class="text-blue-500 text-sm">👁️</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Info Section - Right Side -->
      <div class="w-full md:w-1/2 flex flex-col justify-between space-y-4 relative z-10">
        <!-- Title and Category with Slide Animation -->
        <div class="transform group-hover:translate-x-1 transition-all duration-300 delay-100">
          <h3 class="font-bold text-2xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {{ title }}
          </h3>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 transform group-hover:scale-105 transition-all duration-300">
              {{ category }}
            </span>
          </div>
        </div>

        <!-- Animated Rating Section -->
        <div class="flex items-center gap-3 transform group-hover:translate-x-1 transition-all duration-300 delay-200">
          <div class="flex items-center">
            <div class="flex text-yellow-400">
              <span 
                v-for="star in 5" 
                :key="star"
                class="text-lg transition-all duration-300 hover:scale-125 cursor-pointer"
              >
                {{ star <= Math.floor(rating.rate) ? '★' : '☆' }}
              </span>
            </div>
            <span class="text-sm font-semibold text-gray-800 ml-2 px-2 py-1 bg-yellow-50 rounded-lg">{{ rating.rate }}</span>
          </div>
          <div class="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            <span>📝</span>
            <span>{{ rating.count }} reviews</span>
          </div>
        </div>

        <!-- Enhanced Price Section with Counter Animation -->
        <div class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 transform group-hover:translate-x-1 transition-all duration-300 delay-300 border border-gray-100 group-hover:border-blue-200">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-baseline gap-2">
              <span class="text-4xl font-black text-gray-900 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                ${{ animatedPrice }}
              </span>
              <span class="text-lg text-gray-500 font-medium">USD</span>
              <span class="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold animate-bounce">
                BEST PRICE
              </span>
            </div>
          </div>
          
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-1 text-green-600 font-medium">
                <span>🚚</span>
                <span>Free shipping</span>
              </div>
              <div class="flex items-center gap-1 text-blue-600 font-medium">
                <span>⚡</span>
                <span>Available now</span>
              </div>
            </div>
            <div class="text-right">
              <div class="flex items-center gap-1 text-green-600 text-xs">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>24h delivery</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Action Buttons with Ripple Effect -->
        <div class="flex gap-4 pt-2 transform group-hover:translate-x-1 transition-all duration-300 delay-500">
          <button
            class="flex-1 relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            @click="addToCart"
            @mousedown="createRipple"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              <span class="transition-transform hover:scale-110">🛒</span>
              <span>Add to Cart</span>
            </span>
            <div class="ripple-container absolute inset-0 overflow-hidden rounded-2xl"></div>
          </button>
          
          <button
            class="relative overflow-hidden bg-gradient-to-r from-pink-100 to-red-100 hover:from-pink-200 hover:to-red-200 text-pink-700 hover:text-red-700 font-bold py-4 px-6 rounded-2xl transition-all duration-300 border-2 border-pink-200 hover:border-red-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            @click="toggleWishlist"
          >
            <span :class="['text-2xl transition-all duration-300 transform hover:scale-125', { 'animate-pulse': isWishlisted }]">
              {{ isWishlisted ? '❤️' : '🤍' }}
            </span>
          </button>

          <button
            class="relative overflow-hidden bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 text-green-700 hover:text-emerald-700 font-bold py-4 px-6 rounded-2xl transition-all duration-300 border-2 border-green-200 hover:border-emerald-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            @click="shareProduct"
          >
            <span class="text-xl transition-all duration-300 transform hover:rotate-12">📤</span>
          </button>
        </div>

        <!-- Product Description Preview -->
        <div class="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 transform group-hover:translate-x-1 transition-all duration-300 delay-700 border border-gray-100 opacity-90 group-hover:opacity-100">
          <h4 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>📋</span>
            <span>Product Overview</span>
          </h4>
          <p class="text-gray-700 leading-relaxed text-sm line-clamp-3">{{ description }}</p>
          
          <!-- Feature Tags -->
          <div class="flex flex-wrap gap-2 mt-4">
            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <span>✓</span> Fast Delivery
            </span>
            <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <span>✓</span> Warranty
            </span>
            <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <span>✓</span> Returns
            </span>
          </div>
        </div>
      </div>

      <!-- Success Toast Notification -->
      <Transition name="toast">
        <div v-if="showToast" class="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slide-in-right">
          <span>✅</span>
          <span>{{ toastMessage }}</span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Define props
const props = defineProps({
  id: {
    type: Number,
    default: 1
  },
  title: {
    type: String,
    default: "Premium Product"
  },
  price: {
    type: Number,
    default: 99.99
  },
  description: {
    type: String,
    default: "Amazing product description"
  },
  category: {
    type: String,
    default: "General"
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/400"
  },
  rating: {
    type: Object,
    default: () => ({ rate: 4.0, count: 50 })
  }
});

// Reactive variables
const isWishlisted = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const animatedPrice = ref(0);
const cardRef = ref(null);

// Price counter animation
const animatePrice = () => {
  const duration = 1000;
  const start = 0;
  const end = props.price;
  const startTime = Date.now();
  
  const updatePrice = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    
    animatedPrice.value = Math.round(start + (end - start) * easeOutQuart);
    
    if (progress < 1) {
      requestAnimationFrame(updatePrice);
    }
  };
  
  requestAnimationFrame(updatePrice);
};

onMounted(() => {
  animatePrice();
});

const emit = defineEmits(['add-to-cart']);

const addToCart = () => {
  emit('add-to-cart', {
    id: props.id,
    title: props.title,
    price: props.price,
    image: props.image,
    quantity: 1
  });
  showToastMessage('Added to cart! 🛒');
};

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value;
  const message = isWishlisted.value ? 'Added to wishlist! ❤️' : 'Removed from wishlist';
  showToastMessage(message);
};

const shareProduct = () => {
  console.log('Sharing product:', props.id);
  showToastMessage('Link copied to clipboard! 📤');
};

const showToastMessage = (message) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const createRipple = (event) => {
  const button = event.currentTarget;
  const rippleContainer = button.querySelector('.ripple-container');
  const ripple = document.createElement('div');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.className = 'absolute bg-white bg-opacity-60 rounded-full pointer-events-none animate-ping';
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  
  rippleContainer.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-slide-in-right {
  animation: slide-in-right 0.3s ease-out;
}

/* Prevent horizontal scroll on body */
body {
  overflow-x: hidden;
}
</style>