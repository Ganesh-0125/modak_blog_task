import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/userStore";
import BlogList from "../pages/BlogList.vue";
import BlogDetail from "../pages/BlogDetail.vue";
import MyAccount from "../pages/MyAccount.vue";
import CreatePost from "../pages/CreatePost.vue";

const routes = [
    { path: "/", component: BlogList },
    { path: "/blog/:id", component: BlogDetail },
    {
        path: "/my-account",
        name: "MyAccount",
        component: MyAccount,  // Changed from dynamic import
        meta: { requiresAuth: true }
    },
    {
        path: "/create-post",
        name: "CreatePost",
        component: CreatePost,
        meta: { requiresAuth: true }  // Added auth requirement
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../components/LoginForm.vue")
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../components/RegisterForm.vue")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        next("/login");
    } else if (to.meta.requiresAdmin && !userStore.isAdmin) {
        next("/");
    } else {
        next();
    }
});

export default router;
