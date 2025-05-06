<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Username field -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Username</label>
                    <input v-model="form.username" type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        :class="{ 'border-red-500': v$.username.$error }" required />
                    <span v-if="v$.username.$error" class="text-red-500 text-xs">
                        Username is required
                    </span>
                </div>

                <!-- Email field -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="form.email" type="email"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        :class="{ 'border-red-500': v$.email.$error }" required />
                    <span v-if="v$.email.$error" class="text-red-500 text-xs">
                        Valid email is required
                    </span>
                </div>

                <!-- Password field -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="form.password" type="password"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        :class="{ 'border-red-500': v$.password.$error }" required />
                    <span v-if="v$.password.$error" class="text-red-500 text-xs">
                        Password must be at least 6 characters
                    </span>
                </div>

                <!-- Confirm Password field -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input v-model="form.confirmPassword" type="password"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        :class="{ 'border-red-500': v$.confirmPassword.$error }" required />
                    <span v-if="v$.confirmPassword.$error" class="text-red-500 text-xs">
                        Passwords must match
                    </span>
                </div>

                <!-- Submit button -->
                <div>
                    <button type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        :disabled="isSubmitting">
                        {{ isSubmitting ? 'Registering...' : 'Register' }}
                    </button>
                </div>

                <!-- Login link -->
                <div class="text-center mt-4">
                    <router-link to="/login" class="text-sm text-blue-600 hover:text-blue-500">
                        Already have an account? Login
                    </router-link>
                </div>
            </form>

            <!-- Error message -->
            <div v-if="errorMessage" class="mt-4 p-2 bg-red-100 text-red-700 rounded">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/userStore'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

const router = useRouter()
const userStore = useUserStore()
const isSubmitting = ref(false)
const errorMessage = ref('')

const form = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const rules = {
    username: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirmPassword: { required, sameAsPassword: sameAs(form.password) }
}

const v$ = useVuelidate(rules, form)

async function handleSubmit() {
    errorMessage.value = ''
    const isFormCorrect = await v$.value.$validate()

    if (!isFormCorrect) return

    isSubmitting.value = true

    try {
        const success = await userStore.register({
            username: form.username,
            email: form.email,
            password: form.password
        })

        if (success) {
            router.push('/login')
        }
    } catch (error) {
        errorMessage.value = error.response?.data?.message || 'Registration failed'
    } finally {
        isSubmitting.value = false
    }
}
</script>