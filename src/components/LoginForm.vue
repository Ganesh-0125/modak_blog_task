<template>
    <div class="min-h-screen flex items-center justify-center bg-french-gray-light">
        <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-playfair text-french-blue mb-6 text-center">Login</h2>
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-french-gray">Email</label>
                    <input v-model="form.email" type="email"
                        class="mt-1 block w-full rounded-md border-french-gray shadow-sm focus:border-french-blue focus:ring-french-blue"
                        required />
                </div>
                <div>
                    <label class="block text-sm font-medium text-french-gray">Password</label>
                    <input v-model="form.password" type="password"
                        class="mt-1 block w-full rounded-md border-french-gray shadow-sm focus:border-french-blue focus:ring-french-blue"
                        required />
                </div>
                <div>
                    <button type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-french-blue hover:bg-french-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-french-blue"
                        :disabled="isSubmitting">
                        {{ isSubmitting ? 'Logging in...' : 'Login' }}
                    </button>
                </div>
                <div v-if="errorMessage" class="mt-4 p-2 bg-french-red-light text-french-red rounded">
                    {{ errorMessage }}
                </div>
                <div class="text-center mt-4">
                    <router-link to="/register" class="text-sm text-french-blue hover:text-french-blue-dark">
                        Don't have an account? Register
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';

const router = useRouter();
const userStore = useUserStore();
const isSubmitting = ref(false);
const errorMessage = ref('');

const form = reactive({
    email: '',
    password: ''
});

async function handleSubmit() {
    try {
        isSubmitting.value = true;
        errorMessage.value = '';
        const success = await userStore.login(form);
        if (success) {
            router.push('/blogs');
        }
    } catch (error) {
        errorMessage.value = error.response?.data?.message || 'Login failed';
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<style scoped>
.font-playfair {
    font-family: 'Playfair Display', serif;
}

.bg-french-red-light {
    background-color: #FFE6E5;
}
</style>