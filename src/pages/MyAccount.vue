<template>
    <div class="max-w-4xl mx-auto py-8 px-4">
        <h1 class="text-3xl font-bold mb-6">My Account</h1>
        
        <div class="bg-white shadow rounded-lg p-6">
            <div class="mb-6">
                <h2 class="text-xl font-semibold mb-4">Profile Information</h2>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Username</label>
                        <p class="mt-1 text-gray-900">{{ userStore.user?.username }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <p class="mt-1 text-gray-900">{{ userStore.user?.email }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Role</label>
                        <p class="mt-1 text-gray-900">{{ userStore.user?.role }}</p>
                    </div>
                </div>
            </div>

            <div class="border-t pt-6">
                <h2 class="text-xl font-semibold mb-4">My Posts</h2>
                <div v-if="userPosts.length" class="space-y-4">
                    <div v-for="post in userPosts" :key="post._id" 
                         class="border rounded p-4 hover:bg-gray-50">
                        <h3 class="text-lg font-medium">{{ post.title }}</h3>
                        <p class="text-gray-600 text-sm">
                            Created: {{ new Date(post.createdAt).toLocaleDateString() }}
                        </p>
                        <div class="mt-2 flex gap-2">
                            <button @click="editPost(post._id)" 
                                    class="text-blue-600 hover:text-blue-800">
                                Edit
                            </button>
                            <button @click="deletePost(post._id)" 
                                    class="text-red-600 hover:text-red-800">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <p v-else class="text-gray-500">You haven't created any posts yet.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../store/userStore';
import { useBlogStore } from '../store/index';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const blogStore = useBlogStore();
const router = useRouter();
const userPosts = ref([]);

onMounted(async () => {
    if (!userStore.isAuthenticated) {
        router.push('/login');
        return;
    }
    // Fetch user's posts
    // This assumes you'll add an endpoint to fetch posts by user
    try {
        const response = await fetch(`http://localhost:8000/posts/user/${userStore.user.id}`, {
            headers: {
                'Authorization': `Bearer ${userStore.token}`
            }
        });
        userPosts.value = await response.json();
    } catch (error) {
        console.error('Error fetching user posts:', error);
    }
});

function editPost(postId) {
    router.push(`/blog/${postId}/edit`);
}

async function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        try {
            await fetch(`http://localhost:8000/post/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userStore.token}`
                }
            });
            userPosts.value = userPosts.value.filter(post => post._id !== postId);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }
}
</script>