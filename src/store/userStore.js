import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null,
        token: localStorage.getItem("token") || null,
        role: localStorage.getItem("role") || null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        isAdmin: (state) => state.role === "admin",
        isManager: (state) => state.role === "manager",
        userRole: (state) => state.role,
    },

    actions: {
        async login(credentials) {
            try {
                const response = await axios.post(
                    "http://localhost:8000/login",
                    credentials
                );
                this.token = response.data.token;
                this.user = response.data.user;
                this.role = response.data.user.role;

                localStorage.setItem("token", this.token);
                localStorage.setItem("role", this.role);

                // Set axios default header for future requests
                axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;

                return true;
            } catch (error) {
                console.error("Login error:", error);
                return false;
            }
        },

        async register(userData) {
            try {
                const response = await axios.post(
                    "http://localhost:8000/register",
                    userData
                );
                return true;
            } catch (error) {
                console.error("Registration error:", error);
                return false;
            }
        },

        async logout() {
            this.token = null;
            this.user = null;
            this.role = null;
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            delete axios.defaults.headers.common["Authorization"];
        },
    },
});
