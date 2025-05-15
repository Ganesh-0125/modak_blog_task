<template>
    <div class="relative group h-56 overflow-hidden rounded-md shadow-md shadow-gray-400 bg-white border border-french-gray"
        @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <img :src="blog.imgLink" :alt="blog.title"
            class="w-full h-full object-cover group-hover:scale-105 transition" />
        <div v-if="showActions && isHovered" class="absolute top-2 right-2 flex gap-2 z-50">
            <button @click="$emit('edit')"
                class="text-blue-600 hover:text-blue-900 bg-gray-100 font-bold aspect-square w-6 h-6 rounded-lg"
                aria-label="Edit blog post">
                <i class="pi pi-pencil"></i>
            </button>
            <button @click="$emit('delete')"
                class="text-red-600 hover:text-red-900 bg-gray-100 font-bold aspect-square w-6 h-6 rounded-lg"
                aria-label="Delete blog post">
                <i class="pi pi-trash"></i>
            </button>
        </div>
        <div class="absolute inset-0 bg-black bg-opacity-10 flex items-end">
            <div class="p-4">
                <h2 class="text-white cursor-pointer text-lg p-1 bg-blue-700/60 rounded-md font-bold line-clamp-2"
                    @click="$emit('click')">
                    {{ blog.title }}
                </h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isHovered = ref(false);

defineProps({
    blog: {
        type: Object,
        required: true,
    },
    showActions: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['click', 'edit', 'delete']);
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Smooth transition for the image scale effect */
.transition {
    transition: transform 0.3s ease-in-out;
}
</style>