<template>
    <div v-if="blog" class="max-w-full mx-auto">
        <!-- Background Image with Centered Title -->
        <div class="relative bg-cover bg-center h-72" :style="{ backgroundImage: `url(${blog.imgLink})` }">
            <div class="absolute inset-0 bg-white bg-opacity-50 flex items-end py-16 justify-center">
                <h1 class="text-4xl  text-black drop-shadow-lg md:text-3xl sm:text-2xl">{{
                    blog.title }}</h1>
            </div>
        </div>
        <div class="prose mt-4 mx-32" id="blog-content" v-html="blog.content"></div>
    </div>
    <div v-else class="text-center text-gray-500">Loading blog...</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const blog = ref(null);

onMounted(async () => {
    try {
        const blogId = route.params.id;
        if (!blogId) {
            console.error("Blog ID is undefined");
            return;
        }
        const response = await axios.get(`http://localhost:8000/blog/${blogId}`);
        blog.value = response.data;

        // Wait for the DOM to update with the blog content, then adjust images
        await nextTick();
        blogContentImages();
    } catch (error) {
        console.error("Error fetching blog:", error);
    }
});

function blogContentImages() {
    const imgTags = document.querySelectorAll("#blog-content img");
    imgTags.forEach((img) => {
        // Apply styles to center the image
        img.style.maxWidth = "100%"; // Ensure the image doesn't overflow its container
        img.style.height = "auto"; // Maintain aspect ratio
        img.style.display = "block"; // Make the image a block element to allow margin auto to work
        img.style.margin = "0 auto"; // Center the image horizontally
        img.style.padding = "20px 0"; // Optional: Add some vertical spacing
    });
}
</script>
<style scoped>
/* Ensure the prose class doesn't interfere with custom styles */
.prose {
    max-width: 100%;
}

/* Optional: Adjust the drop-shadow for better readability */
.drop-shadow-lg {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.prose {
    white-space: pre-wrap;
    /* Preserve newlines and spaces */
}

#blog-content img {
    max-width: 100%; /* Prevent overflow */
    height: auto; /* Maintain aspect ratio */
    display: block; /* Allow margin auto to work */
    margin: 0 auto; /* Center horizontally */
    padding: 20px 0; /* Add vertical spacing */
}
</style>