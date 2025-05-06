<template>
    <div class="relative  group  h-56 overflow-hidden rounded-md shadow-md shadow-gray-400 " raised >
        <img :src="blog.imgLink" :alt="blog.title" class="w-full  object-cover group-hover:scale-105 transition" />
        <div class="absolute inset-0 bg-black bg-opacity-10 flex items-end">
            <div class="p-4">
                <h2 class="text-white cursor-pointer text-lg p-1  bg-blue-700/50 drop-shadow rounded-sm font-bold drop-shadow z-50" @click="$emit('click')">{{ blog.title }}</h2>
                <!-- <p class="text-white line-clamp-2">{{ blog.content }}</p> -->
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    blog: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>