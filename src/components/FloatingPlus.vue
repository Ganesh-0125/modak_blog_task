<template>
    <button
        class="fixed bottom-8 cursor-pointer right-8 !bg-blue-900 hover:!bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-50"
        @click="$router.push('/create-post')" aria-label="Create Post">
        <i class="pi pi-plus text-1xl"></i>
    </button>
</template>