// // import { defineStore } from "pinia";
// // import axios from "axios";

// // export const useBlogStore = defineStore("blog", {
// //   state: () => ({
// //     blogs: [],
// //     isEditing: false,
// //     blogBeingEdited: null,
// //     showCreatePost: false,
// //   }),

// //   actions: {
// //     async fetchBlogs() {
// //       try {
// //         const response = await axios.get("http://localhost:8000/posts");
// //         this.blogs = response.data;
// //         const reversedBlogs = [...this.blogs].reverse();
// //         this.blogs = reversedBlogs;
// //       } catch (error) {
// //         console.error(
// //           "Error fetching blogs:",
// //           error.response?.data?.message || error.message
// //         );
// //         throw error;
// //       }
// //     },

// //     async addBlog(blog) {
// //       try {
// //         const response = await axios.post(
// //           "http://localhost:8000/upPosts",
// //           blog
// //         );
// //         if (response.data.message === "Post created successfully") {
// //           this.blogs.unshift(response.data.data);
// //           return true;
// //         }
// //         return false;
// //       } catch (error) {
// //         console.error(
// //           "Error adding blog:",
// //           error.response?.data?.message || error.message
// //         );
// //         throw error;
// //       }
// //     },

// //     async updatePost(id, blog) {
// //       console.log("from store");
// //       // console.log(id, blog);
// //       try {
// //         const response = await axios.put(
// //           `http://localhost:8000/posts/${id}`,
// //           blog
// //         );
// //         // console.log(response)
// //         if (response.data.message === "Post Updated") {
// //           const index = this.blogs.findIndex((b) => b._id === id);
// //           if (index !== -1) {
// //             this.blogs[index] = { ...this.blogs[index], ...blog };
// //           }
// //           this.showCreatePost = false;
// //           this.isEditing = false;
// //           this.blogBeingEdited = null;
// //           //   return true;
// //         }
// //         // return false;
// //       } catch (error) {
// //         console.error(
// //           "Error updating blog:",
// //           error.response?.data?.message || error.message
// //         );
// //         throw error;
// //       }
// //     },
// //   },
// // });

// // latest code

// import { defineStore } from "pinia";
// import axios from "axios";

// export const useBlogStore = defineStore("blog", {
//   state: () => ({
//     blogs: [],
//     isEditing: false,
//     blogBeingEdited: null,
//   }),

//   actions: {
//     async fetchBlogs() {
//       try {
//         const response = await axios.get("http://localhost:8000/posts");
//         this.blogs = response.data;
//         const reversedBlogs = [...this.blogs].reverse();
//         this.blogs = reversedBlogs;
//       } catch (error) {
//         console.error(
//           "Error fetching blogs:",
//           error.response?.data?.message || error.message
//         );
//         throw error;
//       }
//     },

//     async addBlog(blog) {
//       console.log("from store",blog);
//       try {
//         const response = await axios.post("http://localhost:8000/upPosts", blog);
//         if (response.data.message === "Post created successfully") {
//           this.blogs.unshift(response.data.data);
//           return true;
//         }
//         return false;
//       } catch (error) {
//         console.error(
//           "Error adding blog:",
//           error.response?.data?.message || error.message
//         );
//         throw error;
//       }
//     },

//     async updatePost(id, blog) {
//       try {
//         const response = await axios.put(`http://localhost:8000/posts/${id}`, blog);
//         if (response.data.message === "Post Updated") {
//           const index = this.blogs.findIndex((b) => b._id === id);
//           if (index !== -1) {
//             this.blogs[index] = { ...this.blogs[index], ...blog };
//           }
//           this.isEditing = false;
//           this.blogBeingEdited = null;
//           return true;
//         }
//         return false;
//       } catch (error) {
//         console.error(
//           "Error updating blog:",
//           error.response?.data?.message || error.message
//         );
//         throw error;
//       }
//     },

//     async deletePost(id) {
//       try {
//         const response = await axios.delete(`http://localhost:8000/post/${id}`);
//         if (response.data.message === "Post deleted successfully") {
//           this.blogs = this.blogs.filter((blog) => blog._id !== id);
//           return true;
//         }
//         return false;
//       } catch (error) {
//         console.error(
//           "Error deleting blog:",
//           error.response?.data?.message || error.message
//         );
//         throw error;
//       }
//     },
//   },
// });

// File: src/store/index.js
import { defineStore } from "pinia";
import axios from "axios";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    blogs: [],
    isEditing: false,
    blogBeingEdited: null,
  }),

  actions: {
    async fetchBlogs() {
      try {
        const res = await axios.get("http://localhost:8000/posts");
        this.blogs = [...res.data].reverse();
      } catch (error) {
        console.error(
          "Error fetching blogs:",
          error.response?.data?.message || error.message
        );
        throw error;
      }
    },

    async addBlog(blog) {
      try {
        const res = await axios.post("http://localhost:8000/upPosts", blog);
        if (res.data.message === "Post created successfully") {
          this.blogs.unshift(res.data.data);
          return true;
        }
        return false;
      } catch (error) {
        console.error(
          "Error adding blog:",
          error.response?.data?.message || error.message
        );
        return false; // Important to return false instead of throwing, to allow catch at caller level
      }
    },

    async updatePost(id, blog) {
      try {
        const res = await axios.put(`http://localhost:8000/posts/${id}`, blog);
        if (res.data.message === "Post Updated") {
          const index = this.blogs.findIndex((b) => b._id === id);
          if (index !== -1) {
            this.blogs[index] = { ...this.blogs[index], ...blog };
          }
          this.isEditing = false;
          this.blogBeingEdited = null;
          return true;
        }
        return false;
      } catch (error) {
        console.error(
          "Error updating blog:",
          error.response?.data?.message || error.message
        );
        return false;
      }
    },

    async deletePost(id) {
      try {
        const res = await axios.delete(`http://localhost:8000/post/${id}`);
        if (res.data.message === "Post deleted successfully") {
          this.blogs = this.blogs.filter((blog) => blog._id !== id);
          return true;
        }
        return false;
      } catch (error) {
        console.error(
          "Error deleting blog:",
          error.response?.data?.message || error.message
        );
        return false;
      }
    },
  },
});


