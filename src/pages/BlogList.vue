<!--
<template>
    <div class="max-w-7xl mx-auto py-12">
        <h1 class="text-4xl font-bold mb-8">BLOG</h1>
        <div class="grid grid-cols-2 md:grid-cols-2 gap-8">
            <BlogCard v-for="blog in blogs" :key="blog.id" :blog="blog" @click="goToBlog(blog.id)" />
        </div>
    </div>
</template>

<script setup>
import { useBlogStore } from '../store/index.js'
import BlogCard from '../components/BlogCard.vue'
import { useRouter } from 'vue-router'
const store = useBlogStore()
const blogs = store.blogs
const router = useRouter()
function goToBlog(id) { router.push(`/blog/${id}`) }
</script>
-->
<template>
    <div class="max-w-100vw bg-red-500 h-100vh py-12">
        <h1 class="text-4xl font-bold mb-8">BLOG</h1>
        <div v-if="blogs.length === 0" class="text-center text-gray-500">
            No posts are available.
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-1 gap-8">
            <!-- Use _id instead of id -->
            <BlogCard class=" bg-blue-500 p-2 h-100vh" v-for="blog in blogs" :key="blog._id" :blog="blog" @click="goToBlog(blog._id)" />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useBlogStore } from '../store/index.js';
import BlogCard from '../components/BlogCard.vue';
import { useRouter } from 'vue-router';

const store = useBlogStore();
const blogs = store.blogs;
const router = useRouter();

function goToBlog(id) {
    console.log("Blog ID:",id); // Debugging line
    if (id) {
        router.push(`/blog/${id}`); // Ensure the correct _id is passed
    } else {
        console.log("Blog ID is undefined");
    }
}

// Fetch blogs when the component is mounted
onMounted(() => {
    store.fetchBlogs();
});
</script>