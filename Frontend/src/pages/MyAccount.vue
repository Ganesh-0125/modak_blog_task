<!--
<template>
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 class="text-3xl font-playfair text-french-blue mb-6">My Account</h1>
            <div v-if="loading">Loading...</div>
            <div v-else>
                <div v-if="userPosts.length === 0" class="text-gray-500 text-center">
                    No posts found. Create your first post!
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <BlogCard v-for="post in userPosts" :key="post._id" :blog="post" show-actions @edit="editPost(post)"
                        @delete="deletePost(post._id)" @click="viewBlog(post._id)" />
                </div>
            </div>
        </div>
        <FloatingPlus @click="showCreatePost = true" />
        <Modal v-if="showCreatePost" @close="showCreatePost = false">
            <BlogForm :editing="editingPost" @submit="onPostSubmit" @cancel="showCreatePost = false" />
        </Modal>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../store/userStore';
import { useBlogStore } from '../store/index';
import { useRouter } from 'vue-router';
import Modal from '../components/Modal.vue';
import BlogForm from '../components/BlogForm.vue';
import BlogCard from '../components/BlogCard.vue';
import FloatingPlus from '../components/FloatingPlus.vue';
import axios from 'axios';

const userStore = useUserStore();
const blogStore = useBlogStore();
const router = useRouter();
const userPosts = ref([]);
const showCreatePost = ref(false);
const editingPost = ref(null);
const loading = ref(true);

const user = userStore.user;

onMounted(async () => {
    if (!userStore.user?._id || !userStore.isAuthenticated) {
        console.error("User not logged in. Redirecting to login.");
        router.push("/login");
        return;
    }
    await fetchUserPosts();
});

async function fetchUserPosts() {
    try {
        const userId = userStore.user._id;
        const response = await axios.get(`http://localhost:8000/post/${user._id}`, {
            params: { userId },
        });
        // console.log("User posts fetched successfully:", response.data);
        userPosts.value = response.data;

        const reversedPosts = [...userPosts.value].reverse();
        userPosts.value = reversedPosts;
    } catch (error) {
        console.error('Error fetching posts:', error.response?.data?.message || error.message);
        if (error.response?.status === 404) {
            console.error("Posts endpoint not found. Check backend server.");
        }
    } finally {
        loading.value = false;
    }
}

async function onPostSubmit(success) {
    if (success) {
        showCreatePost.value = false;
        editingPost.value = null; // Reset editing state
        await fetchUserPosts();
        await blogStore.fetchBlogs();
    }
}

async function editPost(post) {
    editingPost.value = post;
    showCreatePost.value = true;
    blogStore.isEditing=true;
    blogStore.blogBeingEdited=post._id;

    // try {
    //     const response = await axios.put(
    //         `http://localhost:8000/posts/${post._id}`,
    //         blog
    //     );
    //     if (response.data.message === "Post updated successfully") {
    //         const index = blogStore.blogs.findIndex((b) => b._id === post._id);
    //         if (index !== -1) {
    //             blogStore.blogs[index] = { ...blogStore.blogs[index], ...blog };
    //         }
    //     }
    // } catch (error) {
    //     console.error(
    //         "Error updating blog:",
    //         error.response?.data?.message || error.message
    //     );
    //     throw error;
    // }
}
async function deletePost(postId) {
    console.log("Deleting post with ID:", postId);
    if (confirm('Are you sure you want to delete this post?')) {

        try {
            const response = await axios.delete(
                `http://localhost:8000/post/${postId}`
            );
            if (response.data.message === "Post deleted successfully") {
                blogStore.blogs = blogStore.blogs.filter((blog) => blog._id !== postId);
                router.push("/my-account");
                // return true;
            }
            // return false;
        } catch (error) {
            console.error(
                "Error deleting blog:",
                error.response?.data?.message || error.message
            );
            throw error;
        }
    }
}

function viewBlog(id) {
    router.push(`/blog/${id}`);
}
</script>

<style scoped>
.font-playfair {
    font-family: 'Playfair Display', serif;
}
</style>
-->

<template>
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 class="text-3xl font-playfair text-french-blue mb-6">My Account</h1>
            <div v-if="loading">Loading...</div>
            <div v-else>
                <div v-if="userPosts.length === 0" class="text-gray-500 text-center">
                    No posts found. Create your first post!
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <BlogCard v-for="post in userPosts" :key="post._id" :blog="post" show-actions @edit="editPost(post)"
                        @delete="deletePost(post._id)" @click="viewBlog(post._id)" />
                </div>
            </div>
        </div>
        <FloatingPlus @click="showCreatePost = true" />
        <Modal v-if="showCreatePost" @close="showCreatePost = false">
            <BlogForm :editing="editingPost" @submit="onPostSubmit" @cancel="showCreatePost = false" />
        </Modal>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../store/userStore';
import { useBlogStore } from '../store/index';
import { useRouter } from 'vue-router';
import Modal from '../components/Modal.vue';
import BlogForm from '../components/BlogForm.vue';
import BlogCard from '../components/BlogCard.vue';
import FloatingPlus from '../components/FloatingPlus.vue';
import axios from 'axios';

const userStore = useUserStore();
const blogStore = useBlogStore();
const router = useRouter();
const userPosts = ref([]);
const showCreatePost = ref(false);
const editingPost = ref(null);
const loading = ref(true);

const user = userStore.user;

onMounted(async () => {
    if (!userStore.user?._id || !userStore.isAuthenticated) {
        console.error("User not logged in. Redirecting to login.");
        router.push("/login");
        return;
    }
    await fetchUserPosts();
});

async function fetchUserPosts() {
    try {
        const response = await axios.get(`http://localhost:8000/post/${userStore.user._id}`);
        userPosts.value = response.data;
        const reversedPosts = [...userPosts.value].reverse();
        userPosts.value = reversedPosts;
    } catch (error) {
        console.error('Error fetching posts:', error.response?.data?.message || error.message);
        if (error.response?.status === 404) {
            console.error("Posts endpoint not found. Check backend server.");
        }
    } finally {
        loading.value = false;
    }
}

async function onPostSubmit(success) {
    if (success) {
        // showCreatePost.value = false;
        editingPost.value = null;
        await fetchUserPosts();
        await blogStore.fetchBlogs();
        showCreatePost.value = false;
        editingPost.value = null;
    }
}

function editPost(post) {
    editingPost.value = post;
    showCreatePost.value = true;
    blogStore.isEditing = true;
    blogStore.blogBeingEdited = post._id;
}

async function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        try {
            const success = await blogStore.deletePost(postId);
            if (success) {
                await fetchUserPosts();
                await blogStore.fetchBlogs();
            } else {
                alert("Failed to delete post.");
            }
        } catch (error) {
            alert("Failed to delete post: " + (error.response?.data?.message || "Server error"));
        }
    }
}

function viewBlog(id) {
    router.push(`/blog/${id}`);
}
</script>

<style scoped>
.font-playfair {
    font-family: 'Playfair Display', serif;
}
</style>