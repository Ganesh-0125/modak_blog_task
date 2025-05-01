<template>
    <div>
        <div class="max-w-7xl mx-auto py-12">
            <h1 class="text-3xl font-bold mb-8">My Blogs</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BlogCard v-for="blog in myBlogs" :key="blog.id" :blog="blog" @click="goToBlog(blog.id)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import BlogCard from '../components/BlogCard.vue'
import { useBlogStore } from '../store/index.js'
import { useRouter } from 'vue-router'
const store = useBlogStore()
const router = useRouter()
const myBlogs = store.blogs.filter(b => b.authorEmail === store.user.email)
function goToBlog(id) { router.push(`/blog/${id}`) }
</script>