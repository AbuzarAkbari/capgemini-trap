<template>
  <div ref="container" class="tree-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'

const props = defineProps<{
  steps: number
  totalSteps: number
}>()

const container = ref<HTMLElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let trees: THREE.Group[] = []

const TREE_GROWTH_DURATION = 1.5
const BLOSSOM_COLORS = [0xFFB7C5, 0xFFCCCC, 0xFFC0CB]

const createTree = (position = new THREE.Vector3(0, 0, 0)) => {
  const tree = new THREE.Group()
  
  // Verbeterde stam met meer detail
  const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.5, 4, 12)
  const trunkMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x8B4513,
    roughness: 0.8,
    metalness: 0.2,
    bumpScale: 0.02
  })
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
  trunk.position.y = 2
  
  // Start met schaal 0 voor groei-animatie
  trunk.scale.set(0, 0, 0)
  tree.add(trunk)
  
  // Animeer de groei van de stam
  if (props.steps >= 200) {
    gsap.to(trunk.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: TREE_GROWTH_DURATION,
      ease: "elastic.out(1, 0.5)"
    })
  }
  
  // Voeg takken en bloesems toe met animaties
  if (props.steps >= 400) {
    addBranches(tree, Math.min(1, (props.steps - 400) / 200))
  }
  
  if (props.steps >= 600) {
    addBlossoms(tree, Math.min(1, (props.steps - 600) / 400))
  }
  
  tree.position.copy(position)
  return tree
}

const addBranches = (tree: THREE.Group, growth: number) => {
  const branchMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 })
  
  for (let i = 0; i < 5; i++) {
    const branchGeometry = new THREE.CylinderGeometry(0.15, 0.2, 2, 8)
    const branch = new THREE.Mesh(branchGeometry, branchMaterial)
    
    branch.position.y = 3 + Math.random()
    branch.rotation.z = (Math.random() - 0.5) * Math.PI * 0.5
    branch.rotation.x = (Math.random() - 0.5) * Math.PI * 0.5
    branch.scale.set(growth, growth, growth)
    
    tree.add(branch)
  }
}

const addBlossoms = (tree: THREE.Group, growth: number) => {
  const blossomGroup = new THREE.Group()
  
  for (let i = 0; i < 30; i++) {
    const size = 0.2 + Math.random() * 0.2
    const blossomGeometry = new THREE.SphereGeometry(size, 8, 8)
    const blossomMaterial = new THREE.MeshPhongMaterial({ 
      color: BLOSSOM_COLORS[Math.floor(Math.random() * BLOSSOM_COLORS.length)],
      transparent: true,
      opacity: 0.9
    })
    
    const blossom = new THREE.Mesh(blossomGeometry, blossomMaterial)
    
    // Verbeterde positionering voor natuurlijker uitstraling
    const angle = Math.random() * Math.PI * 2
    const radius = 1.5 + Math.random()
    blossom.position.x = Math.cos(angle) * radius
    blossom.position.z = Math.sin(angle) * radius
    blossom.position.y = 3 + Math.random() * 2
    
    // Start met schaal 0 voor animatie
    blossom.scale.set(0, 0, 0)
    
    // Animeer het verschijnen van bloesems
    gsap.to(blossom.scale, {
      x: growth,
      y: growth,
      z: growth,
      duration: 1,
      delay: Math.random() * 0.5,
      ease: "back.out(2)"
    })
    
    // Voeg subtiele zwevende animatie toe
    gsap.to(blossom.position, {
      y: `+=${0.1 + Math.random() * 0.2}`,
      duration: 1 + Math.random(),
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    })
    
    blossomGroup.add(blossom)
  }
  
  tree.add(blossomGroup)
}

const init = () => {
  if (!container.value) return
  
  // Scene setup
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf8f9fa)
  
  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(8, 6, 8)
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  container.value.appendChild(renderer.domElement)
  
  // Controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)
  
  const mainLight = new THREE.DirectionalLight(0xffffff, 0.8)
  mainLight.position.set(5, 5, 5)
  mainLight.castShadow = true
  scene.add(mainLight)
  
  const fillLight = new THREE.DirectionalLight(0x9CA3AF, 0.3)
  fillLight.position.set(-5, 3, -5)
  scene.add(fillLight)
  
  // Verbeterde renderer settings
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputEncoding = THREE.sRGBEncoding
  
  // Verbeterde camera instellingen
  camera.position.set(8, 6, 8)
  controls.maxDistance = 20
  controls.minDistance = 4
  controls.maxPolarAngle = Math.PI / 2 - 0.1
  
  // Ground
  const groundGeometry = new THREE.PlaneGeometry(20, 20)
  const groundMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x90EE90,
    side: THREE.DoubleSide
  })
  const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  ground.rotation.x = -Math.PI / 2
  scene.add(ground)
  
  updateTrees()
  animate()
}

const updateTrees = () => {
  // Verwijder bestaande bomen
  trees.forEach(tree => scene.remove(tree))
  trees = []
  
  // Voeg nieuwe bomen toe
  const mainTree = createTree()
  scene.add(mainTree)
  trees.push(mainTree)
  
  // Voeg extra bomen toe voor elke 500 stappen boven 1000
  if (props.totalSteps > 1000) {
    const extraTrees = Math.floor((props.totalSteps - 1000) / 500)
    for (let i = 0; i < extraTrees; i++) {
      const position = new THREE.Vector3(
        (i + 1) * 4 - 2,
        0,
        (Math.random() - 0.5) * 4
      )
      const tree = createTree(position)
      scene.add(tree)
      trees.push(tree)
    }
  }
}

const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

const handleResize = () => {
  if (!container.value) return
  
  camera.aspect = container.value.clientWidth / container.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
}

onMounted(() => {
  init()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

watch(() => props.steps, updateTrees)
watch(() => props.totalSteps, updateTrees)
</script>

<style scoped>
.tree-container {
  width: 100%;
  height: 100%;
}
</style> 