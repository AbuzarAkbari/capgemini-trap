<template>
  <div class="chart-wrapper">
    <h3 v-if="title" class="text-center mb-3">{{ title }}</h3>
    <div class="chart-container">
      <component
        :is="chartType"
        :data="chartData"
        :options="mergedOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line, Bar, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string
    tension?: number
    fill?: boolean
    borderWidth?: number
  }[]
}

interface Props {
  type: 'line' | 'bar' | 'doughnut'
  title?: string
  data: ChartData
  options?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({})
})

const chartType = computed(() => {
  switch (props.type) {
    case 'line': return Line
    case 'bar': return Bar
    case 'doughnut': return Doughnut
    default: return Line
  }
})

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const
    }
  }
}

const mergedOptions = computed(() => ({
  ...defaultOptions,
  ...props.options
}))

// Ensure chartData is properly typed and structured
const chartData = computed(() => ({
  labels: props.data.labels || [],
  datasets: props.data.datasets || []
}))
</script>

<style scoped>
.chart-container {
  height: 300px;
  position: relative;
}

.chart-wrapper {
  padding: 1rem;
}
</style>