<template>
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 class="text-3xl font-playfair text-french-blue mb-6">My Account</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BlogCard v-for="post in userPosts" :key="post._id" :blog="post" show-actions @edit="editPost(post)"
                    @delete="deletePost(post._id)" @click="viewBlog(post._id)" />
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
import Modal from '../components/Modal.vue';
import BlogForm from '../components/BlogForm.vue';
import BlogCard from '../components/BlogCard.vue';
import FloatingPlus from '../components/FloatingPlus.vue';
import axios from 'axios';

const userStore = useUserStore();
const blogStore = useBlogStore();
const userPosts = ref([]);
const showCreatePost = ref(false);
const editingPost = ref(null);

onMounted(async () => {
    await fetchUserPosts();
});

async function fetchUserPosts() {
    try {
        const response = await axios.get('http://localhost:8000/posts');
        userPosts.value = response.data.filter(post => post.author === userStore.user._id);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

async function onPostSubmit(postData) {
    try {
        if (editingPost.value) {
            const success = await blogStore.updatePost(editingPost.value._id, postData);
            if (success) {
                showCreatePost.value = false;
                await fetchUserPosts();
            }
        } else {
            const success = await blogStore.addBlog({
                ...postData,
                author: userStore.user._id,
            });
            if (success) {
                showCreatePost.value = false;
                await fetchUserPosts();
                await blogStore.fetchBlogs();
            }
        }
    } catch (error) {
        console.error('Error saving post:', error);
    }
}

function editPost(post) {
    editingPost.value = post;
    showCreatePost.value = true;
}

async function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        try {
            const success = await blogStore.deletePost(postId);
            if (success) {
                await fetchUserPosts();
                await blogStore.fetchBlogs();
            }
        } catch (error) {
            console.error('Error deleting post:', error);
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