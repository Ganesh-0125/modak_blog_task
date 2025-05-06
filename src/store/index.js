import { defineStore } from "pinia";
import axios from "axios";

const defaultBlogs = [
    // ... (your default blogs array)
];

export const useBlogStore = defineStore("blog", {
    state: () => ({
        blogs: [], // Initialize with empty array
    }),
    actions: {
        async fetchBlogs() {
            try {
                const response = await axios.get("http://localhost:8000/posts");
                this.blogs = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                console.log("Blogs fetched in store:", this.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                this.blogs = defaultBlogs; // Fallback to default blogs if fetch fails
            }
        },
        async addBlog(blog) {
            try {
                const userStore = useUserStore();
                if (!userStore.isAuthenticated) {
                    throw new Error('Authentication required');
                }

                console.log("Sending blog to backend:", blog);
                const response = await axios.post('http://localhost:8000/upPosts', blog, {
                    headers: {
                        'Authorization': `Bearer ${userStore.token}`
                    }
                });
                this.blogs.unshift(response.data.data);
                console.log("Response from backend:", response.data);
                return true;
            } catch (error) {
                console.error('Error adding blog:', error);
                return false;
            }
        },
    },
});