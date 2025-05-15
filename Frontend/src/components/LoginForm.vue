<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="max-w-md w-full border !border-gray-200  bg-white rounded-lg shadow-lg p-8" raised>
            <h2 class="text-2xl font-playfair text-french-blue mb-6 text-center">Login</h2>
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label class="block text-md font-medium text-french-gray">Email*</label>
                    <input v-model="form.email" type="email"
                        class="mt-1 block w-full  rounded-md border border-gray-300 shadow-md p-1"
                        required />
                </div>
                <div>
                    <label class="block text-md font-medium text-french-gray">Password*</label>
                    <input v-model="form.password" type="password"
                        class="mt-1 block w-full rounded-md border border-gray-300 shadow-md p-1"
                        required />
                </div>
                <div>
                    <button type="submit"
                        class="w-full flex justify-center p-1 border border-blue-300 rounded-md shadow-md text-md font-bold text-black bg-blue-400 hover:!bg-blue-500"
                        :disabled="isSubmitting">
                        {{ isSubmitting ? 'Logging in...' : 'Login' }}
                    </button>
                </div>
                <div v-if="errorMessage" class="mt-4 p-2 bg-french-red-light text-french-red rounded">
                    {{ errorMessage }}
                </div>
                <div class="text-center mt-4">
                    <span class="text-md text-blue-500 hover:text-blue-600">Don't have an account?</span>
                    <router-link to="/register" class="text-md underline text-green-500 hover:text-green-600">
                        Register !
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