<template>
  <!-- Medical Heartbeat Background -->
  <MedicalBackground />

  <!-- Main Content -->
  <div class="min-h-screen text-gray-800 relative z-10">
    <Header />
    <main class="p-4 flex flex-col gap-4 max-w-6xl mx-auto">
      <div 
        v-for="section in sections" 
        :key="section.id"
        class="p-4 bg-white bg-opacity-90 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:scale-102 transition-all duration-400 ease-in-out relative overflow-hidden hover:before:opacity-5 backdrop-blur-sm"
        :class="section.beforeClass"
      >
        <div class="flex gap-4 relative z-10 h-full">
          <div class="flex-1 flex gap-4 flex-col md:flex-row h-full">
            <div class="w-full md:w-90 h-full flex-shrink-0">
              <img 
                :src="section.image" 
                :alt="section.title" 
                class="w-full h-full object-cover rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 hover:brightness-110 transition-all duration-400 ease-in-out"
              >
            </div>
            <div class="pl-6 border-l-4 border-red-600 min-h-[100px] flex items-center justify-center w-full">
              <p class="m-0 text-lg leading-relaxed text-gray-700 text-center">
                {{ section.description }}
              </p>
            </div>
          </div>
          <div class="flex flex-col items-center bg-gradient-to-br from-pink-200 to-pink-300 p-8 rounded-2xl min-w-36 hover:scale-105 hover:shadow-lg hover:shadow-pink-200/30 transition-all duration-400 ease-in-out relative z-10 hover:before:opacity-10">
            <div class="text-4xl mb-5 drop-shadow-md hover:scale-120 hover:rotate-10 transition-transform">
              {{ section.icon }}
            </div>
            <div class="text-center">
              <div class="font-semibold mb-5 text-gray-800 text-xl tracking-wider">
                {{ section.title }}
              </div>
              <router-link
                v-if="section.route"
                :to="section.route"
                class="inline-block bg-gradient-to-br from-sky-300 to-sky-400 border-none px-10 py-4 rounded-full text-white cursor-pointer text-lg font-medium uppercase tracking-wider shadow-lg shadow-sky-300/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-300/40 hover:tracking-widest active:translate-y-0 transition-all"
              >
                {{ section.buttonText }}
              </router-link>
              <a
                v-else-if="section.externalLink"
                :href="section.externalLink"
                target="_blank"
                class="inline-block bg-gradient-to-br from-sky-300 to-sky-400 border-none px-10 py-4 rounded-full text-white cursor-pointer text-lg font-medium uppercase tracking-wider shadow-lg shadow-sky-300/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-300/40 hover:tracking-widest active:translate-y-0 transition-all"
              >
                {{ section.buttonText }}
              </a>
              <button
                v-else
                @click="handleAction(section.action)"
                class="inline-block bg-gradient-to-br from-sky-300 to-sky-400 border-none px-10 py-4 rounded-full text-white cursor-pointer text-lg font-medium uppercase tracking-wider shadow-lg shadow-sky-300/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-300/40 hover:tracking-widest active:translate-y-0 transition-all"
              >
                {{ section.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Social Icons Section -->
      <div class="p-4 bg-white bg-opacity-90 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:scale-102 transition-all duration-400 ease-in-out relative overflow-hidden hover:before:opacity-5 backdrop-blur-sm before:bg-gradient-to-r before:from-red-600 before:to-red-400">
        <div class="flex flex-col items-center p-8">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">Connect With Us</h2>
          <div class="flex gap-6">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              target="_blank"
              class="text-4xl hover:scale-125 transition-transform duration-300"
              :class="social.color"
              :title="social.name"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import Header from "@/components/HeaderSection.vue";
import { RouterLink, useRouter } from 'vue-router';
import MedicalBackground from '@/components/MedicalBackground.vue'

const router = useRouter();

// Handle button actions
const handleAction = (action) => {
  if (action === 'donate') {
    router.push('/login');
  }
};

// Social media links
const socialLinks = ref([
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: 'fab fa-facebook',
    color: 'text-blue-600'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: 'fab fa-twitter',
    color: 'text-sky-400'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: 'fab fa-instagram',
    color: 'text-pink-600'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com',
    icon: 'fab fa-youtube',
    color: 'text-red-600'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: 'fab fa-linkedin',
    color: 'text-blue-700'
  }
]);

// 3D Blood Cells Animation Setup
const bloodCellsGrid = ref(null);
let animationId = null;
let scene = null;
let camera = null;
let renderer = null;
let bloodCellsMesh = null;

const initBloodCells = () => {
  if (!bloodCellsGrid.value) return;

  try {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    bloodCellsGrid.value.appendChild(renderer.domElement);

    const cellsGeometry = new THREE.BufferGeometry();
    const cellCount = 800;
    const posArray = new Float32Array(cellCount * 3);
    const colorArray = new Float32Array(cellCount * 3);
    
    for(let i = 0; i < cellCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 12;
      posArray[i + 1] = (Math.random() - 0.5) * 12;
      posArray[i + 2] = (Math.random() - 0.5) * 12;
      
      const intensity = 0.8 + Math.random() * 0.2;
      colorArray[i] = intensity;
      colorArray[i + 1] = 0.1;
      colorArray[i + 2] = 0.1;
    }
    
    cellsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    cellsGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const cellsMaterial = new THREE.PointsMaterial({
      size: 0.03,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      sizeAttenuation: true
    });
    
    bloodCellsMesh = new THREE.Points(cellsGeometry, cellsMaterial);
    scene.add(bloodCellsMesh);
    camera.position.z = 4;
    animate();
    
    window.addEventListener('resize', handleResize);
  } catch (error) {
    console.error('Failed to initialize blood cells:', error);
  }
};

const animate = () => {
  animationId = requestAnimationFrame(animate);
  if (bloodCellsMesh) {
    bloodCellsMesh.rotation.x += 0.0003;
    bloodCellsMesh.rotation.y += 0.0005;
    const time = Date.now() * 0.002;
    bloodCellsMesh.position.y = Math.sin(time) * 0.05;
    bloodCellsMesh.position.x = Math.cos(time * 0.7) * 0.03;
  }
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
};

const handleResize = () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
};

const cleanup = () => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('resize', handleResize);
  if (bloodCellsMesh) {
    scene?.remove(bloodCellsMesh);
    bloodCellsMesh.geometry?.dispose();
    bloodCellsMesh.material?.dispose();
  }
  if (renderer) {
    renderer.dispose();
    if (renderer.domElement?.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  }
};

onMounted(() => {
  setTimeout(() => {
    initBloodCells();
  }, 100);
});

onUnmounted(() => {
  cleanup();
});

// Sections Data
const sections = ref([
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=500&q=80',
    description: 'A website that provides blood donation services and locates nearby hospitals for individuals in need of blood serves as a crucial platform for saving lives. It connects blood donors with recipients in real-time, ensuring prompt assistance during emergencies.',
    icon: '♂',
    title: 'Find a Donor',
    buttonText: 'Go',
    route: '/find-blood',
    beforeClass: 'before:bg-gradient-to-r before:from-red-600 before:to-red-400'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&q=80',
    description: 'Blood donation is a vital act of generosity that helps save lives and maintain an adequate blood supply for emergencies. Donors are usually healthy individuals who meet specific eligibility criteria, including age, weight, and overall health. Regular blood donations are critical to supporting healthcare systems globally',
    icon: '🔍',
    title: 'Find A Hospital', 
    buttonText: '255K',
    route: '/find-hospital',
    beforeClass: 'before:bg-gradient-to-r before:from-red-600 before:to-red-400'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80',
    description: 'Notifications are essential for keeping users informed about important updates or events. They help enhance user engagement and ensure timely communication.',
    icon: '🔔',
    title: 'Blood Request',
    buttonText: '100K',
    route: '/requests',
    beforeClass: 'before:bg-gradient-to-r before:from-red-600 before:to-red-400'
  },
  {
  id: 4,
  image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&q=80',
  description: 'Join our community of blood donors and help save lives today. Your donation can make a difference in someone\'s life. Click the button below to start the donation process.',
  icon: '❤️',
  title: 'Donate Now',
  buttonText: 'Donate',
  action: 'donate',
  beforeClass: 'before:bg-gradient-to-r before:from-red-600 before:to-red-400'
}
]);
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>