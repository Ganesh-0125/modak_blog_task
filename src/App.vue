<template>
  <div class="flex flex-col min-h-screen bg-french-gray-light">
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap');

:root {
  --french-blue: #0072BB;
  --french-red: #EF4135;
  --french-gray: #8E8E93;
  --french-blue-dark: #005A94;
  --french-red-dark: #D32F23;
  --french-gray-light: #F5F5F5;
}

body {
  font-family: 'Inter', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
}
</style>