<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/logo.svg" alt="Capgemini" height="30" class="me-2">
      </router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" aria-controls="navbarNav" 
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/progressie">Progressie</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/game">Game</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import 'bootstrap/js/dist/collapse'

onMounted(() => {
  // Bootstrap JS wordt automatisch geïnitialiseerd
})
</script>

<style scoped>
.navbar-brand {
  font-weight: 600;
}

.router-link-active {
  color: #fff !important;
  font-weight: 600;
}
</style> 