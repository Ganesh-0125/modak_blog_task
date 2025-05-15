import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: !!localStorage.getItem('token'),
    }),

    actions: {
        async register(userData) {
            console.log("userData" + userData)
            try {
                const response = await axios.post('http://localhost:8000/register', {
                    name: userData.username,
                    email: userData.email,
                    password: userData.password,
                });
                if (response.data.message === 'User Registered Successfully') {
                    return true;
                }
                return false;
            } catch (error) {
                console.log('Registration error:', error.response?.data?.message);
                throw error;
            }
        },

        async login(credentials) {
            try {
                const response = await axios.post('http://localhost:8000/login', credentials);
                if (response.data.message === 'Login successful') {
                    this.user = response.data.user;
                    this.token = response.data.token;
                    this.isAuthenticated = true;
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('token', response.data.token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Login error:', error.response?.data?.message);
                throw error;
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            this.isAuthenticated = false;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        },
    },
});