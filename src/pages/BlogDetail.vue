<!--
<template>
    <div>
        <div class="relative h-96">
            <img :src="blog.cover" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 class="text-white text-4xl font-bold drop-shadow">{{ blog.title }}</h1>
            </div>
        </div>
        <div class="max-w-4xl mx-auto py-8">
            <BlogContent :content="blog.content" />
            <div class="flex items-center mt-8">
                <img :src="blog.authorImage" class="w-16 h-16 rounded-full mr-4" />
                <div>
                    <div class="font-bold">{{ blog.author }}</div>
                    <div class="text-sm text-gray-500">{{ blog.designation }}</div>
                </div>
            </div>
            <LeaveReplyForm :blogId="blog.id" />
            <PrevNextNav :currentId="blog.id" />
        </div>
    </div>
</template>

<script setup>
import { useBlogStore } from '../store/index.js'
import { useRoute } from 'vue-router'
import BlogContent from '../components/BlogContent.vue'
import LeaveReplyForm from '../components/LeaveReplyForm.vue'
import PrevNextNav from '../components/PrevNextNav.vue'
const store = useBlogStore()
const route = useRoute()
const blog = store.blogs.find(b => b.id === route.params.id) || {}
</script>
-->
<template>
    <div v-if="blog" class="max-w-4xl mx-auto py-12">
        <h1 class="text-4xl font-bold mb-4">{{ blog.title }}</h1>
        <img :src="blog.imgLink" :alt="blog.title" class="w-full h-auto mb-4" />
        <div class="prose">{{ plainContent }}</div>
    </div>
    <div v-else class="text-center text-gray-500">
        Loading blog...
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const blog = ref(null);

onMounted(async () => {
    try {
        const blogId = route.params.id;
        if (!blogId) {
            console.error("Blog ID is undefined");
            return;
        }
        const response = await axios.get(`http://localhost:8000/posts/${blogId}`);
        blog.value = response.data;
    } catch (error) {
        console.error("Error fetching blog:", error);
    }
});

const plainContent = computed(() => {
    if (!blog.value || !blog.value.content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = blog.value.content || '';
    return tempDiv.textContent || tempDiv.innerText || '';
});
</script>

<style scoped>
.prose {
    white-space: pre-wrap; /* Preserve newlines and spaces */
}
</style>