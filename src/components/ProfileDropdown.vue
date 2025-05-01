<template>
    <div class="relative">
        <button @click="toggle" class="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
            <i class="pi pi-user text-xl"></i>
        </button>
        <div v-if="open" class="absolute right-0 mt-2 w-56 bg-white shadow rounded-md z-50">
            <div class="p-4 border-b">
                <div class="font-bold">{{ user.name || 'Guest' }}</div>
                <div class="text-xs text-gray-500">{{ user.email || 'No email' }}</div>
            </div>
            <ul>
                <li>
                    <button class="w-full text-left px-4 py-2 hover:bg-gray-100" @click="goToAccount">My
                        Account</button>
                </li>
                <li>
                    <button class="w-full text-left px-4 py-2 hover:bg-gray-100" @click="logout">Logout</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBlogStore } from '../store/index.js'
import { useRouter } from 'vue-router'
const open = ref(false)
const store = useBlogStore()
const user = store.user
const router = useRouter()
function toggle() { open.value = !open.value }
function goToAccount() { router.push('/my-account'); open.value = false }
function logout() { store.logout(); open.value = false }
</script>