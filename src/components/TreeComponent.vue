<template>
  <div class="tree-container">
    <svg viewBox="0 0 200 200" class="tree">
      <!-- Stam basis (altijd zichtbaar) -->
      <path
        d="M95 180 C92 180 90 140 90 140 L110 140 C110 140 108 180 105 180 Z"
        fill="#8B4513"
        class="trunk-base"
      />
      
      <!-- Hoofdstam (vanaf 100 stappen) -->
      <path
        d="M95 140 C90 120 93 100 100 80 C107 100 110 120 105 140"
        fill="#6B3E26"
        :class="{ 'grow': steps >= 100 }"
        class="trunk-main"
      />
      
      <!-- Takken (vanaf 200 stappen) -->
      <g :class="{ 'grow': steps >= 200 }" class="branches">
        <!-- Linker takken -->
        <path
          d="M98 120 C80 110 70 100 65 85 C68 83 72 82 75 83 C85 85 98 110 98 120"
          fill="#8B4513"
        />
        <path
          d="M98 100 C75 95 65 85 60 70 C63 68 67 67 70 68 C80 70 98 90 98 100"
          fill="#6B3E26"
        />
        
        <!-- Rechter takken -->
        <path
          d="M102 120 C120 110 130 100 135 85 C132 83 128 82 125 83 C115 85 102 110 102 120"
          fill="#8B4513"
        />
        <path
          d="M102 100 C125 95 135 85 140 70 C137 68 133 67 130 68 C120 70 102 90 102 100"
          fill="#6B3E26"
        />
      </g>
      
      <!-- Bloesems (vanaf 300 stappen) -->
      <g :class="{ 'grow': steps >= 300 }" class="blossoms">
        <!-- Linker bloesemgroepen -->
        <g class="blossom-group-left">
          <circle cx="65" cy="85" r="15" fill="rgba(255, 183, 197, 0.6)" />
          <circle cx="60" cy="70" r="12" fill="rgba(255, 183, 197, 0.7)" />
          <circle cx="75" cy="83" r="10" fill="rgba(255, 183, 197, 0.8)" />
        </g>
        
        <!-- Rechter bloesemgroepen -->
        <g class="blossom-group-right">
          <circle cx="135" cy="85" r="15" fill="rgba(255, 183, 197, 0.6)" />
          <circle cx="140" cy="70" r="12" fill="rgba(255, 183, 197, 0.7)" />
          <circle cx="125" cy="83" r="10" fill="rgba(255, 183, 197, 0.8)" />
        </g>
        
        <!-- Top bloesemgroep -->
        <g class="blossom-group-top">
          <circle cx="100" cy="60" r="18" fill="rgba(255, 183, 197, 0.7)" />
          <circle cx="90" cy="70" r="12" fill="rgba(255, 183, 197, 0.6)" />
          <circle cx="110" cy="70" r="12" fill="rgba(255, 183, 197, 0.6)" />
        </g>
        
        <!-- Kleine bloesems -->
        <g class="small-blossoms">
          <circle cx="80" cy="90" r="3" fill="#FFB7C5" />
          <circle cx="120" cy="90" r="3" fill="#FFB7C5" />
          <circle cx="70" cy="75" r="2" fill="#FFB7C5" />
          <circle cx="130" cy="75" r="2" fill="#FFB7C5" />
          <circle cx="95" cy="65" r="2" fill="#FFB7C5" />
          <circle cx="105" cy="65" r="2" fill="#FFB7C5" />
        </g>
      </g>
      
      <!-- Vallende bloemblaadjes (vanaf 300 stappen) -->
      <g :class="{ 'grow': steps >= 300 }" class="falling-petals">
        <path
          v-for="(petal, index) in 8"
          :key="index"
          :d="`M${80 + index * 10} ${100 + index * 15} q5,-5 10,0 q5,5 0,10 q-5,5 -10,0 q-5,-5 0,-10`"
          fill="rgba(255, 183, 197, 0.4)"
          :class="`falling-petal-${index}`"
        />
      </g>
    </svg>
    
    <div class="progress-text mt-4">
      {{ steps }} / {{ totalStepsNeeded }} stappen
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  steps: number
  totalStepsNeeded: number
}>()
</script>

<style scoped>
.tree-container {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.tree {
  width: 100%;
  height: auto;
}

.grow {
  animation: growIn 1.5s ease-out forwards;
}

@keyframes growIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* 3D schaduw effecten */
.trunk-main, .trunk-base {
  filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.3));
}

.branches path {
  filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.2));
}

.blossoms circle {
  filter: drop-shadow(0px 1px 2px rgba(0,0,0,0.1));
}

/* Vallende bloemblaadjes animatie */
@keyframes falling {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.8;
  }
  100% {
    transform: translate(20px, 40px) rotate(45deg);
    opacity: 0;
  }
}

.falling-petals path {
  animation: falling 3s ease-in infinite;
}

/* Verschillende timings voor vallende blaadjes */
.falling-petal-0 { animation-delay: 0s; }
.falling-petal-1 { animation-delay: 0.4s; }
.falling-petal-2 { animation-delay: 0.8s; }
.falling-petal-3 { animation-delay: 1.2s; }
.falling-petal-4 { animation-delay: 1.6s; }
.falling-petal-5 { animation-delay: 2.0s; }
.falling-petal-6 { animation-delay: 2.4s; }
.falling-petal-7 { animation-delay: 2.8s; }

.progress-text {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

/* Zachte overgang voor alle animaties */
* {
  transition: all 0.3s ease;
}
</style> 