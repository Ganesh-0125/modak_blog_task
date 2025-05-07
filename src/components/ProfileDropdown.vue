<template>
    <div class="relative">
        <button @click="toggle" class="rounded-full bg-french-gray w-10 h-10 flex items-center justify-center">
            <i class="pi pi-user text-xl text-french-blue"></i>
        </button>
        <div v-if="open" class="absolute right-0 mt-2 w-56 bg-white shadow rounded-md z-50">
            <div class="p-4 border-b border-french-gray">
                <div class="font-bold text-french-blue">{{ user.name || 'Guest' }}</div>
                <div class="text-xs text-french-gray">{{ user.email || 'No email' }}</div>
            </div>
            <ul>
                <li>
                    <button class="w-full text-left px-4 py-2 hover:bg-french-gray-light text-french-blue"
                        @click="goToAccount">
                        My Account
                    </button>
                </li>
                <li>
                    <button class="w-full text-left px-4 py-2 hover:bg-french-gray-light text-french-red"
                        @click="logout">
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';

const open = ref(false);
const userStore = useUserStore();
const user = userStore.user;
const router = useRouter();

function toggle() {
    open.value = !open.value;
}

function goToAccount() {
    router.push('/my-account');
    open.value = false;
}

function logout() {
    userStore.logout();
    router.push('/login');
    open.value = false;
}
</script>