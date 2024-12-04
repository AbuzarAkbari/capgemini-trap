<template>
  <div class="progressie-page">
    <div class="container py-4">
      <div class="quote-section text-center mb-4">
        <blockquote class="blockquote">
          <p class="mb-0">"Your body is your most valuable asset. Protect it by moving more."</p>
        </blockquote>
      </div>
      
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <ChartComponent
                type="doughnut"
                title="Trappen Gelopen"
                :data="stairsData"
              />
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <ChartComponent
                type="doughnut"
                title="Treden Gelopen"
                :data="stepsData"
              />
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <ChartComponent
                type="doughnut"
                title="Calorieën Verbrand"
                :data="caloriesData"
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

const stairsData = {
  labels: ['Gelopen', 'Resterend'],
  datasets: [{
    data: [15, 5],
    backgroundColor: ['#28a745', '#e9ecef']
  }]
}

const stepsData = {
  labels: ['Gelopen', 'Resterend'],
  datasets: [{
    data: [150, 50],
    backgroundColor: ['#fd7e14', '#e9ecef']
  }]
}

const caloriesData = {
  labels: ['Verbrand', 'Resterend'],
  datasets: [{
    data: [75, 25],
    backgroundColor: ['#dc3545', '#e9ecef']
  }]
}
</script> 