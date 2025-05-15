<template>
    <button
        class="fixed bottom-8 cursor-pointer right-8 bg-blue-700 hover:bg-blue-800 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-[100]"
        @click="$router.push('/create-post')" aria-label="Create Post">
        <i class="pi pi-plus text-xl font-bold "></i>
    </button>
</template>
