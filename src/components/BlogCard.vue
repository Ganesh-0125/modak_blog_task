<template>
    <div class="relative cursor-pointer group h-72 overflow-hidden rounded-lg shadow">
        <img :src="blog.imgLink" alt="Blog Cover" class="w-full h-[100vh] object-cover group-hover:scale-105 transition" />
        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div class="p-4">
                <h2 class="text-white text-2xl font-bold drop-shadow">{{ blog}}</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({ blog: Object })
</script>
