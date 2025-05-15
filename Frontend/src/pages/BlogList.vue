<template>
    <div class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-4xl font-playfair text-french-blue mb-8">Blogs</h1>
        <div v-if="loading" class="text-center text-gray-500">Loading blogs...</div>
        <div v-else>
            <div v-if="blogStore.blogs.length === 0" class="text-center text-gray-500">
                No blogs found. Be the first to create one!
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BlogCard
                    v-for="blog in blogStore.blogs"
                    :key="blog._id"
                    :blog="blog"
                    @click="viewBlog(blog._id)"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBlogStore } from '../store/index';
import BlogCard from '../components/BlogCard.vue';

const blogStore = useBlogStore();
const router = useRouter();
const loading = ref(true);

onMounted(async () => {
    try {
        await blogStore.fetchBlogs();
    } catch (error) {
        console.error("Failed to load blogs:", error);
        alert("An error occurred while loading blogs. Please try again later.");
    } finally {
        loading.value = false;
    }
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