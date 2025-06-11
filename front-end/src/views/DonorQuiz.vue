<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100 relative overflow-hidden">
    <!-- Three.js Canvas Container -->
    <div ref="threeContainer" class="fixed inset-0 z-0 pointer-events-none"></div>
    
    <!-- Main Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-4xl">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="flex items-center justify-center mb-6">
            <button @click="goBack" class="mr-6 p-3 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110 glass-button">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 blood-gradient rounded-full flex items-center justify-center pulse-animation shadow-lg">
                <svg class="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c-4.97 0-9 4.03-9 9 0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11c0-4.97-4.03-9-9-9zm0 12c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                </svg>
              </div>
              <div>
                <h1 class="text-4xl font-bold bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent leading-tight">
                  Questions before you can find a donor blood
                </h1>
              </div>
            </div>
          </div>
          
          <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            To protect the people who receive donated blood and the donors who give it, we ask questions before you can donate
          </p>
        </div>

        <!-- Main Form Card -->
        <div class="glass-card rounded-3xl p-8 shadow-2xl border border-white/20">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-3">Answer a few quick questions</h2>
            <p class="text-red-500 text-sm font-medium flex items-center">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              please select at least one option
            </p>
          </div>

          <div class="space-y-4 mb-8">
            <div 
              v-for="(question, index) in questions" 
              :key="index" 
              class="question-card rounded-xl p-6 border border-gray-200/50 hover:border-red-200 transition-all duration-300 group"
            >
              <label class="flex items-start space-x-4 cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="selectedAnswers[index]"
                  class="checkbox-custom mt-1 cursor-pointer"
                >
                <span class="text-gray-700 font-medium leading-relaxed group-hover:text-gray-900 transition-colors text-lg">
                  {{ question }}
                </span>
              </label>
            </div>
          </div>

          <!-- Continue Button -->
          <div class="flex justify-end">
            <button 
              @click="handleContinue"
              :disabled="!hasSelectedAnswer"
              :class="[
                'px-10 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform text-lg',
                hasSelectedAnswer 
                  ? 'blood-gradient hover:scale-105 hover:shadow-xl shadow-red-200 hover:-translate-y-1' 
                  : 'bg-gray-300 cursor-not-allowed'
              ]"
            >
              Continue
              <svg class="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5-5 5M6 12h12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-8">
          <p class="text-gray-500 text-sm">
            Your responses help ensure the safety of our blood supply and protect your health.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// Three.js variables
let scene, camera, renderer, bloodCells = []
let animationId = null
const threeContainer = ref(null)

// Form data
const selectedAnswers = ref(Array(10).fill(false))

const questions = ref([
  'Have you donated blood in the past three months?',
  'Are you currently taking any medications?',
  'Do you have any chronic illnesses (e.g., diabetes, hypertension)?',
  'Do you smoke or consume alcohol regularly?',
  'Have you had any adverse reactions to donating blood in the past?',
  'Do you have any recent tattoos or piercings?',
  'Have you undergone any surgeries or medical procedures recently?',
  'Do you have blood transfusion for 6 months?',
  'Have you ever been diagnosed with hepatitis, HIV, or other infectious diseases?',
  'Are there medications that thin the blood?'
])

// Computed properties
const hasSelectedAnswer = computed(() => {
  return selectedAnswers.value.some(answer => answer === true)
})

// Methods
const goBack = () => {
  console.log('Going back...')
}

const handleContinue = () => {
  if (hasSelectedAnswer.value) {
    console.log('Continuing with selected answers:', selectedAnswers.value)
  }
}

// Three.js setup
const initThreeJS = () => {
  if (!threeContainer.value) return

  // Scene setup
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true,
    powerPreference: 'high-performance'
  })
  
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  threeContainer.value.appendChild(renderer.domElement)

  // Create blood drop geometry (teardrop shape)
  const createBloodDropGeometry = () => {
    const geometry = new THREE.SphereGeometry(0.08, 16, 16)
    // Modify vertices to create teardrop shape
    const vertices = geometry.attributes.position.array
    for (let i = 0; i < vertices.length; i += 3) {
      const y = vertices[i + 1]
      if (y > 0) {
        // Stretch the top part to create teardrop effect
        vertices[i + 1] = y * 1.5
        const stretch = Math.abs(y) * 0.3
        vertices[i] *= (1 - stretch)
        vertices[i + 2] *= (1 - stretch)
      }
    }
    geometry.attributes.position.needsUpdate = true
    return geometry
  }

  // Blood drop materials with different shades
  const bloodMaterials = [
    new THREE.MeshBasicMaterial({ 
      color: 0xff0000,
      transparent: true,
      opacity: 0.8
    }),
    new THREE.MeshBasicMaterial({ 
      color: 0xdd0000,
      transparent: true,
      opacity: 0.7
    }),
    new THREE.MeshBasicMaterial({ 
      color: 0xcc0000,
      transparent: true,
      opacity: 0.6
    }),
    new THREE.MeshBasicMaterial({ 
      color: 0xaa0000,
      transparent: true,
      opacity: 0.5
    })
  ]

  // Create multiple blood drops
  for (let i = 0; i < 60; i++) {
    const bloodDropGeometry = createBloodDropGeometry()
    const material = bloodMaterials[Math.floor(Math.random() * bloodMaterials.length)]
    const bloodDrop = new THREE.Mesh(bloodDropGeometry, material)
    
    // Random positions across the screen
    bloodDrop.position.x = (Math.random() - 0.5) * 25
    bloodDrop.position.y = Math.random() * 15 + 10 // Start from top
    bloodDrop.position.z = (Math.random() - 0.5) * 10
    
    // Random sizes
    const scale = Math.random() * 0.8 + 0.4
    bloodDrop.scale.set(scale, scale, scale)
    
    // Random fall speed and slight horizontal drift
    bloodDrop.userData = {
      fallSpeed: Math.random() * 0.02 + 0.01,
      horizontalDrift: (Math.random() - 0.5) * 0.005,
      rotationSpeed: Math.random() * 0.02,
      resetHeight: Math.random() * 5 + 10
    }
    
    scene.add(bloodDrop)
    bloodCells.push(bloodDrop)
  }

  camera.position.z = 8
  animate()
}

const animate = () => {
  if (!renderer || !scene || !camera) return
  
  animationId = requestAnimationFrame(animate)
  
  // Animate blood drops falling
  bloodCells.forEach(drop => {
    // Make drops fall down
    drop.position.y -= drop.userData.fallSpeed
    
    // Add slight horizontal drift for realism
    drop.position.x += drop.userData.horizontalDrift
    
    // Gentle rotation as they fall
    drop.rotation.z += drop.userData.rotationSpeed
    drop.rotation.x += drop.userData.rotationSpeed * 0.5
    
    // Reset position when drop goes below screen
    if (drop.position.y < -12) {
      drop.position.y = drop.userData.resetHeight + Math.random() * 5
      drop.position.x = (Math.random() - 0.5) * 25
      // Randomize properties for variation
      drop.userData.fallSpeed = Math.random() * 0.02 + 0.01
      drop.userData.horizontalDrift = (Math.random() - 0.5) * 0.005
    }
    
    // Add some subtle wobble effect
    const time = Date.now() * 0.001
    drop.position.x += Math.sin(time + drop.position.y) * 0.002
  })
  
  renderer.render(scene, camera)
}

const handleResize = () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

const cleanup = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (renderer && threeContainer.value && renderer.domElement) {
    threeContainer.value.removeChild(renderer.domElement)
    renderer.dispose()
  }
  bloodCells = []
}

// Lifecycle hooks
onMounted(() => {
  initThreeJS()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  cleanup()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.blood-gradient {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
}

.glass-card {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-button {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.question-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.question-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background: rgba(255, 255, 255, 0.95);
}

.checkbox-custom {
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
}

.checkbox-custom:hover {
  border-color: #ef4444;
  transform: scale(1.05);
}

.checkbox-custom:checked {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border-color: #dc2626;
  transform: scale(1.1);
}

.checkbox-custom:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { 
    opacity: 1; 
    transform: scale(1);
  }
  50% { 
    opacity: 0.8; 
    transform: scale(1.05);
  }
}

/* Glassmorphism effects */
.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
}

/* Smooth animations */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover:not(:disabled) {
  box-shadow: 0 20px 25px -5px rgba(239, 68, 68, 0.4), 0 10px 10px -5px rgba(239, 68, 68, 0.2);
}

/* Responsive design */
@media (max-width: 768px) {
  .question-card {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .glass-card {
    padding: 1.5rem;
  }
}
</style>