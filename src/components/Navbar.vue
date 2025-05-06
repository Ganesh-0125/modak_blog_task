<template>
    <nav class="flex items-center justify-between px-8 py-2 shadow-md bg-white">
        <div class="text-5xl font-bold text-blue-500">modak</div>
        <div class="flex items-center gap-4">
            <template v-if="userStore.isAuthenticated">
                <button class="btn" @click="$router.push('/my-account')">My Account</button>
                <button class="btn" @click="handleLogout">Logout</button>
                <span class="text-sm text-gray-600">Role: {{ userStore.userRole }}</span>
            </template>
            <template v-else>
                <button class="btn" @click="$router.push('/login')">Login</button>
                <button class="btn" @click="$router.push('/register')">Register</button>
            </template>
        </div>
    </nav>
</template>

<script setup>
import { useUserStore } from '../store/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

async function handleLogout() {
    await userStore.logout();
    router.push('/login');
}
</script>