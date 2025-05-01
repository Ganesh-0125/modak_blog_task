import { createRouter, createWebHistory } from "vue-router";
import BlogList from "../pages/BlogList.vue";
import BlogDetail from "../pages/BlogDetail.vue";
import MyAccount from "../pages/MyAccount.vue";
import CreatePost from "../pages/CreatePost.vue";

const routes = [
    { path: "/", component: BlogList },
    { path: "/blog/:id", component: BlogDetail },
    { path: "/my-account", component: MyAccount },
    { path: "/create-post", component: CreatePost },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
