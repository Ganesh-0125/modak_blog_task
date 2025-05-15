<template>
    <div class="relative">
        <button @click="toggle" class="rounded-full bg-gray-200 birder border-gray-500 w-10 h-10 flex items-center justify-center">
            <i class="pi pi-user text-xl text-french-blue"></i>
        </button>
        <div v-if="open" class="absolute right-0 mt-1 w-56 bg-gray-100 shadow-md rounded-md border z-50" raised>
            <div class="p-4 border-b border-french-gray">
                <div class="font-bold text-gray-700">{{ user.name || 'Guest' }} <span class="text-gray-600 text-sm ">({{ user.role|| 'User' }})</span></div>
                <div class="text-sm text-blue-500">{{ user.email || 'No email' }}</div>
            </div>
            <ul>
                <li>
                    <button class="w-full text-left px-4 py-2 "
                        @click="goToAccount">
                        My Account
                    </button>
                </li>
                <li>
                    <button class="w-full text-left px-4 py-2 text-red-500 hover:!text-red-700"
                        @click="logout">
                        <i class="pi pi-sign-out text-sm *:"></i> Logout
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
window.addEventListener('click', (event) => {
            if (!event.target.closest('.relative')) {
                open.value = false;
                
            }
        })

</script>