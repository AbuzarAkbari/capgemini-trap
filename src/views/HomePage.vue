<template>
  <div class="home">
    <div class="hero-image">
      <img src="@/assets/banner.jpg" alt="Capgemini Office" class="w-100">
      <div class="hero-overlay">
        <div class="container">
          <h1 class="display-4 text-white">Welkom bij Capgemini Steps</h1>
          <p class="lead text-white">Samen bouwen we aan een gezondere werkplek</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero-image {
  position: relative;
  height: calc(100vh - 56px);
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
}
</style> 