<template>
  <div class="dashboard">
    <Quote />
    
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <DonutChart
              title="Trappen Gelopen"
              :value="15"
              :total="20"
              color="#28a745"
            />
          </div>
        </div>
        
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <DonutChart
              title="Treden Gelopen"
              :value="150"
              :total="200"
              color="#fd7e14"
            />
          </div>
        </div>
        
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <DonutChart
              title="Calorieën Verbrand"
              :value="75"
              :total="100"
              color="#dc3545"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Quote from './Quote.vue'
import DonutChart from './DonutChart.vue'
</script>

<style scoped>
.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style> 