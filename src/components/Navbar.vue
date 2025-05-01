<template>
    <nav class="flex items-center justify-between px-8 py-4 shadow bg-white">
        <div class="text-2xl font-bold text-blue-500">modak</div>
        <div class="flex items-center gap-4">
            <button class="btn" @click="$router.push('/my-account')">My Account</button>
            <ProfileDropdown />
        </div>
    </nav>
</template>

<script setup>
import ProfileDropdown from './ProfileDropdown.vue'
</script>