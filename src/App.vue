<template>
  <div class="flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-grow">
          <router-view />
      </main>
      <Footer />
      <FloatingPlus />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import FloatingPlus from './components/FloatingPlus.vue';
</script>

<style scoped>
</style>