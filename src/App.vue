<template>
  <div>
    <Navbar />
    <router-view />
    <FloatingPlus />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import FloatingPlus from './components/FloatingPlus.vue'
</script>

<style scoped>
</style>