<template>
  <div class="game-page">
    <div class="container py-4 text-center">
      <h1 class="mb-4">Sakura Steps Challenge</h1>
      <p class="lead mb-4">
        Help de Sakura boom groeien met elke 200 stappen!
      </p>
      
      <div class="tree-section mb-4">
        <SakuraTreeComponent
          :steps="currentSteps"
          :total-steps="currentSteps"
        />
      </div>
      
      <div class="steps-counter mb-4">
        <h2>Totaal aantal stappen: {{ currentSteps }}</h2>
      </div>
      
      <div class="milestones mt-4">
        <h3>Mijlpalen:</h3>
        <ul class="list-unstyled">
          <li :class="{ 'text-success': currentSteps >= 200 }">
            200 stappen - Stam groeit
          </li>
          <li :class="{ 'text-success': currentSteps >= 400 }">
            400 stappen - Takken verschijnen
          </li>
          <li :class="{ 'text-success': currentSteps >= 600 }">
            600 stappen - Eerste bloesems
          </li>
          <li :class="{ 'text-success': currentSteps >= 800 }">
            800 stappen - Meer takken en bloemen
          </li>
          <li :class="{ 'text-success': currentSteps >= 1000 }">
            1000 stappen - Volgroeide boom
          </li>
          <li>Elke 500 extra stappen - Nieuwe boom</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SakuraTreeComponent from '@/components/SakuraTreeComponent.vue'

const currentSteps = ref(0)
const stepIncrement = 50

const simulateSteps = () => {
  const interval = setInterval(() => {
    if (currentSteps.value < 2000) {
      currentSteps.value += stepIncrement
    } else {
      clearInterval(interval)
    }
  }, 1000)
}

onMounted(() => {
  simulateSteps()
})
</script>

<style scoped>
.game-page {
  background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  padding: 2rem 0;
}

.tree-section {
  height: 500px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.milestones li {
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.text-success {
  font-weight: bold;
}
</style> 