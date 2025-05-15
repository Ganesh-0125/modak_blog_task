<!--
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Username</label>
          <input
            v-model="form.username"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Registering..." : "Register" }}
          </button>
        </div>

        <div v-if="errorMessage" class="mt-4 p-2 bg-red-100 text-red-700 rounded">
          {{ errorMessage }}
        </div>

        <div class="text-center mt-4">
          <router-link to="/login" class="text-sm text-blue-600 hover:text-blue-500">
            Already have an account? Login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore";

const router = useRouter();
const userStore = useUserStore();
const isSubmitting = ref(false);
const errorMessage = ref("");

const form = reactive({
  username: "",
  email: "",
  password: "",
});

async function handleSubmit() {
  console.log(form);
  try {
      const response = await axios.post('http://localhost:8000/register', {
          name: form.username,
          email: form.email,
          password: form.password,
      });
      if (response.data.message === 'User Registered Successfully') {
          return true;
      }
      return false;
  } catch (error) {
      console.error('Registration error:', error.response?.data?.message);
      throw error;
  }

//   try {
//       const response = await axios.post('http://localhost:8000/register',form);
//       if (response.data.message === 'User Registered Successfully') {
//           return true;
//       }
//       return false;
//   } catch (error) {
//       console.error('Registration error:', error.response?.data?.message);
//       throw error;
//   }

//   try {
//     isSubmitting.value = true;
//     errorMessage.value = "";

//     // const success = await userStore.register({
//     //   username: form.username,
//     //   email: form.email,
//     //   password: form.password,
//     // });
//     const success = await userStore.register(form)

//     if (success) {
//       router.push("/login");
//     }
//   } catch (error) {
//     errorMessage.value = error.response?.data?.message || "Registration failed";
//   } finally {
//     isSubmitting.value = false;
//   }
}
</script>


-->

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full border !border-gray-200 bg-white rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Username field -->
        <div>
          <label class="block text-md font-bold text-gray-700">Username *</label>
          <input v-model="form.username" type="text"
            class="mt-1 block w-full p-1 rounded-md border !border-gray-300 shadow-md " required />
        </div>

        <!-- Email field -->
        <div>
          <label class="block text-md font-medium text-gray-700">Email *</label>
          <input v-model="form.email" type="email"
            class="mt-1 block w-full rounded-md p-1 border !border-gray-300 shadow-md" required />
        </div>

        <!-- Password field -->
        <div>
          <label class="block text-md font-medium text-gray-700">Password *</label>
          <input v-model="form.password" type="password"
            class="mt-1 block w-full rounded-md  p-1 border !border-gray-300 shadow-md" required />
        </div>
        <!-- Role dropdown -->
        <div>
          <label class="block text-md font-medium text-gray-700">Role</label>
          <select v-model="form.role"
            class="mt-1 text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required>
            <option disabled value="">Select a role</option>
            <option value="user">User</option>
            <option value="Manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <!-- Submit button -->
        <div>
          <button type="submit"
            class="w-full flex justify-center p-2 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :disabled="isSubmitting">
            {{ isSubmitting ? "Submitting..." : "Submit" }}
          </button>
        </div>

        <!-- Error message -->
        <div v-if="errorMessage" class="mt-4 p-2 bg-red-100 text-red-700 rounded">
          {{ errorMessage }}
        </div>

        <!-- Login link -->
        <div class="text-center mt-4">
          <span class="text-md text-blue-500 hover:text-blue-600"> Already have an account?</span>
          <router-link to="/login" class="text-md underline text-green-500 hover:text-green-600">
            Login !
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios"; // ✅ axios import

const router = useRouter();

const isSubmitting = ref(false);
const errorMessage = ref("");

const form = reactive({
  username: "",
  email: "",
  password: "",
  role: "",
});

async function handleSubmit() {
  console.log(form)
  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    const response = await axios.post("http://localhost:8000/register", {
      name: form.username,
      email: form.email,
      password: form.password,
      role: form.role,
    });

    if (response.data.message === "User Registered Successfully") {
      router.push("/login");
    } else {
      errorMessage.value = response.data.message || "Registration failed.";
    }
  } catch (error) {
    console.error("Full registration error:", error);
    errorMessage.value =
      error.response?.data?.message || "Something went wrong during registration.";
  } finally {
    isSubmitting.value = false;
  }
}
</script>
