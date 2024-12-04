<template>
  <div class="dashboard-page">
    <div class="container py-5">
      <h1 class="text-center mb-5">Our Daily Step Progress</h1>
      
      <div class="row g-4">
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <ChartComponent
                type="bar"
                title="Wekelijkse Stappen"
                :data="weeklyData"
                :options="weeklyOptions"
              />
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <ChartComponent
                type="line"
                title="Dagelijkse Stappen Verdeling"
                :data="dailyData"
                :options="dailyOptions"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChartComponent from '@/components/ChartComponent.vue'

// Typed data structure for the weekly chart
const weeklyData = {
  labels: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag'],
  datasets: [{
    label: 'Aantal stappen',
    data: [8500, 7200, 9300, 8100, 9500],
    backgroundColor: [
      '#FFC107', // Geel
      '#28a745', // Groen
      '#0070AD', // Blauw
      '#dc3545', // Rood
      '#17a2b8'  // Extra kleur voor vrijdag
    ],
    borderWidth: 1
  }]
}

const weeklyOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Stappen per werkdag',
      font: {
        size: 16
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Aantal stappen'
      }
    }
  }
}

// Typed data structure for the daily chart
const dailyData = {
  labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  datasets: [{
    label: 'Stappen per uur',
    data: [500, 800, 1200, 1800, 900, 1500, 1300, 1100, 700],
    borderColor: '#0070AD',
    backgroundColor: 'rgba(0, 112, 173, 0.1)',
    tension: 0.4,
    fill: true
  }]
}

const dailyOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Stappen distributie over de dag',
      font: {
        size: 16
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Aantal stappen'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Tijdstip'
      }
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

h1 {
  color: #333;
  font-weight: 600;
}

.card-body {
  height: 400px;
  padding: 1.5rem;
}
</style> 