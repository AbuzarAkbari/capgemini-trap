<template>
  <div class="chart-wrapper">
    <h3 class="text-center mb-3">{{ title }}</h3>
    <div class="chart-container">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  title: string
  value: number
  total: number
  color: string
}

const props = defineProps<Props>()

const chartData = computed(() => ({
  labels: ['Voltooid', 'Resterend'],
  datasets: [{
    data: [props.value, props.total - props.value],
    backgroundColor: [props.color, '#e9ecef'],
    borderWidth: 0
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const
    }
  }
}
</script>

<style scoped>
.chart-container {
  height: 250px;
  position: relative;
}

.chart-wrapper {
  padding: 1rem;
}
</style> 