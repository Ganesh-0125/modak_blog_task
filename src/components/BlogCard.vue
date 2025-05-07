<template>
    <div
        class="relative group h-56 overflow-hidden rounded-md shadow-md shadow-gray-400 bg-white border border-french-gray">
        <img :src="blog.imgLink" :alt="blog.title"
            class="w-full h-full object-cover group-hover:scale-105 transition" />
        <div v-if="showActions" class="absolute top-2 right-2 flex gap-2 z-50">
            <button @click="$emit('edit')"
                class="text-french-blue hover:text-french-blue-dark bg-white rounded-full p-1">
                <i class="pi pi-pencil"></i>
            </button>
            <button @click="$emit('delete')"
                class="text-french-red hover:text-french-red-dark bg-white rounded-full p-1">
                <i class="pi pi-trash"></i>
            </button>
        </div>
        <div class="absolute inset-0 bg-black bg-opacity-10 flex items-end">
            <div class="p-4">
                <h2 class="text-white cursor-pointer text-lg p-1 bg-french-blue/50 drop-shadow rounded-sm font-bold"
                    @click="$emit('click')">{{ blog.title }}</h2>
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
</style>