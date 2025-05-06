<template>
    <div class="py-6">
        <div class="max-w-5xl mx-auto">
            <h1 class="text-3xl font-bold text-left">ALL BLOGS</h1>
            <div v-if="store.blogs.length === 0" class="text-center text-gray-500">
                No posts are available.
            </div>
            <div v-else class="grid p-12 grid-cols-1 md:grid-cols-2 gap-4">
                <BlogCard v-for="blog in store.blogs" :key="blog._id" :blog="blog" @click="goToBlog(blog._id)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useBlogStore } from '../store/index.js';
import BlogCard from "../components/BlogCard.vue";
import { useRouter } from "vue-router";

const store = useBlogStore();
const router = useRouter();

function goToBlog(id) {
    console.log("Blog ID:", id);
    if (id) {
        router.push(`/blog/${id}`);
    } else {
        console.error("Blog ID is undefined");
    }
}

onMounted(() => {
    store.fetchBlogs();
});
</script>