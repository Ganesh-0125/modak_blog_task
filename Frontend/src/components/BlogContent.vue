<template>
    <div class="prose max-w-none" v-html="content"></div>
</template>
<script setup>
defineProps({ content: String })
</script>