<template>
    <nav class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-16">
                <router-link to="/blogs" class="flex items-center">
                    <span class="text-3xl font-playfair text-french-blue">modak</span>
                </router-link>
                <div class="flex items-center gap-4">
                    <template v-if="!['/login', '/register'].includes($route.path)">
                        <template v-if="userStore.isAuthenticated">
                            <ProfileDropdown />
                        </template>
                        <template v-else>
                            <router-link to="/login" class="text-french-blue hover:text-french-blue-dark font-medium">
                                Login
                            </router-link>
                            <router-link to="/register"
                                class="bg-french-blue hover:bg-french-blue-dark text-white px-4 py-2 rounded-lg">
                                Register
                            </router-link>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useUserStore } from '../store/userStore';
import ProfileDropdown from '../components/ProfileDropdown.vue';

const userStore = useUserStore();
</script>

<style scoped>
.font-playfair {
    font-family: 'Playfair Display', serif;
}
</style>