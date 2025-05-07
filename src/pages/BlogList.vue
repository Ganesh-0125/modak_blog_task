<template>
    <div class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-4xl font-playfair text-french-blue mb-8">All Blogs</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlogCard v-for="blog in blogStore.blogs" :key="blog._id" :blog="blog" @click="viewBlog(blog._id)" />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBlogStore } from '../store/index';
import BlogCard from '../components/BlogCard.vue';

const blogStore = useBlogStore();
const router = useRouter();

onMounted(async () => {
    await blogStore.fetchBlogs();
});

function viewBlog(id) {
    router.push(`/blog/${id}`);
}
</script>

<style scoped>
.font-playfair {
    font-family: 'Playfair Display', serif;
}
</style>