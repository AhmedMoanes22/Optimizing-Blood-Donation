<template>
  <div 
    ref="threeContainer" 
    class="fixed inset-0 z-0 pointer-events-none"
    :style="{ 
      'opacity': opacity,
      'mix-blend-mode': 'multiply'
    }"
  ></div>
</template>
<script setup>
import * as THREE from 'three'
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  dropCount: {
    type: Number,
    default: 60,
    validator: (value) => value >= 10 && value <= 200
  },
  colors: {
    type: Array,
    default: () => ['#ff0000', '#dd0000', '#cc0000', '#aa0000']
  },
  speed: {
    type: Number,
    default: 1,
    validator: (value) => value >= 0.1 && value <= 5
  },
  size: {
    type: Number,
    default: 1,
    validator: (value) => value >= 0.1 && value <= 3
  },
  opacity: {
    type: Number,
    default: 0.7,
    validator: (value) => value >= 0.1 && value <= 1
  },
  responsive: {
    type: Boolean,
    default: true
  }
})

const threeContainer = ref(null)
let scene, camera, renderer, bloodCells = []
let animationId = null
let resizeObserver = null

const initThreeJS = () => {
  if (!threeContainer.value) return

  // Scene setup
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  
  // Enhanced renderer with better defaults
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
    logarithmicDepthBuffer: true
  })
  
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  threeContainer.value.appendChild(renderer.domElement)

  // Create optimized blood drop geometry (shared among all drops)
  const bloodDropGeometry = createBloodDropGeometry()
  
  // Create materials from prop colors
  const bloodMaterials = props.colors.map(color => 
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: props.opacity,
      depthWrite: false
    })
  )

  // Create blood drops with instancing for better performance
  bloodCells = Array.from({ length: props.dropCount }, () => {
    const material = bloodMaterials[Math.floor(Math.random() * bloodMaterials.length)]
    const bloodDrop = new THREE.Mesh(bloodDropGeometry, material)
    
    // Random positions across the screen
    bloodDrop.position.x = (Math.random() - 0.5) * 25
    bloodDrop.position.y = Math.random() * 15 + 10
    bloodDrop.position.z = (Math.random() - 0.5) * 10
    
    // Scale based on size prop
    const scale = (Math.random() * 0.8 + 0.4) * props.size
    bloodDrop.scale.set(scale, scale, scale)
    
    // Animation properties
    bloodDrop.userData = {
      fallSpeed: (Math.random() * 0.02 + 0.01) * props.speed,
      horizontalDrift: (Math.random() - 0.5) * 0.005 * props.speed,
      rotationSpeed: Math.random() * 0.02 * props.speed,
      resetHeight: Math.random() * 5 + 10,
      initialY: Math.random() * 15 + 10
    }
    
    scene.add(bloodDrop)
    return bloodDrop
  })

  camera.position.z = 8
  animate()
}

const createBloodDropGeometry = () => {
  const geometry = new THREE.SphereGeometry(0.08, 16, 16)
  const vertices = geometry.attributes.position.array
  
  // Create teardrop shape
  for (let i = 0; i < vertices.length; i += 3) {
    const y = vertices[i + 1]
    if (y > 0) {
      vertices[i + 1] = y * 1.5
      const stretch = Math.abs(y) * 0.3
      vertices[i] *= (1 - stretch)
      vertices[i + 2] *= (1 - stretch)
    }
  }
  
  geometry.attributes.position.needsUpdate = true
  return geometry
}

const animate = () => {
  if (!renderer || !scene || !camera) return
  
  animationId = requestAnimationFrame(animate)
  const time = Date.now() * 0.001
  
  bloodCells.forEach(drop => {
    // Apply falling animation
    drop.position.y -= drop.userData.fallSpeed
    drop.position.x += drop.userData.horizontalDrift
    
    // Rotation effects
    drop.rotation.z += drop.userData.rotationSpeed
    drop.rotation.x += drop.userData.rotationSpeed * 0.5
    
    // Reset when out of view
    if (drop.position.y < -12) {
      resetDropPosition(drop)
    }
    
    // Subtle wobble effect
    drop.position.x += Math.sin(time + drop.position.y) * 0.002
  })
  
  renderer.render(scene, camera)
}

const resetDropPosition = (drop) => {
  drop.position.y = drop.userData.initialY + Math.random() * 5
  drop.position.x = (Math.random() - 0.5) * 25
  // Randomize properties for variation
  drop.userData.fallSpeed = (Math.random() * 0.02 + 0.01) * props.speed
  drop.userData.horizontalDrift = (Math.random() - 0.5) * 0.005 * props.speed
}

const handleResize = () => {
  if (!props.responsive || !camera || !renderer) return
  
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

const cleanup = () => {
  if (animationId) cancelAnimationFrame(animationId)
  if (resizeObserver) resizeObserver.disconnect()
  
  if (renderer && threeContainer.value && renderer.domElement) {
    threeContainer.value.removeChild(renderer.domElement)
    renderer.dispose()
  }
  
  if (scene) {
    scene.traverse(object => {
      if (object.isMesh) {
        object.geometry?.dispose()
        object.material?.dispose()
      }
    })
  }
  
  bloodCells = []
}

// Watch for prop changes
watch(() => [props.speed, props.size, props.opacity, props.colors], () => {
  if (bloodCells.length) {
    bloodCells.forEach(drop => {
      // Update speeds when speed prop changes
      drop.userData.fallSpeed = (Math.random() * 0.02 + 0.01) * props.speed
      drop.userData.horizontalDrift = (Math.random() - 0.5) * 0.005 * props.speed
      drop.userData.rotationSpeed = Math.random() * 0.02 * props.speed
      
      // Update size
      const scale = (Math.random() * 0.8 + 0.4) * props.size
      drop.scale.set(scale, scale, scale)
      
      // Update opacity if material exists
      if (drop.material) {
        drop.material.opacity = props.opacity
      }
    })
  }
})

onMounted(() => {
  initThreeJS()
  
  if (props.responsive) {
    window.addEventListener('resize', handleResize)
    
    // Modern resize observer as fallback
    resizeObserver = new ResizeObserver(() => handleResize())
    if (threeContainer.value) {
      resizeObserver.observe(threeContainer.value)
    }
  }
})

onUnmounted(() => {
  cleanup()
})
</script>