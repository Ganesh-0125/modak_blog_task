import { defineStore } from 'pinia';
import axios from 'axios';

export const useBlogStore = defineStore('blog', {
    state: () => ({
        blogs: []
    }),

    actions: {
        async fetchBlogs() {
            try {
                const response = await axios.get('http://localhost:8000/posts');
                this.blogs = response.data;
            } catch (error) {
                console.error('Error fetching blogs:', error);
                throw error;
            }
        },

        async addBlog(blog) {
            try {
                const response = await axios.post('http://localhost:8000/upPosts', blog);
                if (response.data.message === "Post created successfully") {
                    this.blogs.unshift(response.data.data);
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Error adding blog:', error);
                throw error;
            }
        },

        async updatePost(id, blog) {
            try {
                const response = await axios.put(`http://localhost:8000/posts/${id}`, blog);
                if (response.data.message === "Post Updated") {
                    const index = this.blogs.findIndex(b => b._id === id);
                    if (index !== -1) {
                        this.blogs[index] = { ...this.blogs[index], ...blog };
                    }
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Error updating blog:', error);
                throw error;
            }
        },

        async deletePost(id) {
            try {
                const response = await axios.delete(`http://localhost:8000/post/${id}`);
                if (response.data.message === "Post Deleted") {
                    this.blogs = this.blogs.filter(blog => blog._id !== id);
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Error deleting blog:', error);
                throw error;
            }
        }
    }
});