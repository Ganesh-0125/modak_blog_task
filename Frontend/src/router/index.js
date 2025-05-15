import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/userStore";
import BlogList from "../pages/BlogList.vue";
import BlogDetail from "../pages/BlogDetail.vue";
import MyAccount from "../pages/MyAccount.vue";
import CreatePost from "../pages/CreatePost.vue";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";

const routes = [
    { path: "/", redirect: "/blogs" },
    { path: "/blogs", component: BlogList, meta: { requiresAuth: false } },
    { path: "/blog/:id", component: BlogDetail },
    // {
    //     path: "/my-account",
    //     name: "MyAccount",
    //     // component: () => import("../pages/MyAccount.vue"),
    //     component: () => import("../pages/MyAccount.vue"),
    //     // meta: { requiresAuth: true },
    // },      
    {
        path: "/my-account",
        name: "MyAccount",
        component: MyAccount,
        // meta: { requiresAuth: true },
    },
    {
        path: "/create-post",
        name: "CreatePost",
        component: CreatePost,
        // meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "Login",
        component: LoginForm,
        meta: { hideNavigation: true },
    },
    {
        path: "/register",
        name: "Register",
        component: RegisterForm,
        meta: { hideNavigation: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        next("/login");
    } else if (to.path === "/login" && userStore.isAuthenticated) {
        next("/blogs");
    } else {
        next();
    }
});

export default router;
