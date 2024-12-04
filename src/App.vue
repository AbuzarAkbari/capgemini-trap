<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar.vue'
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>

