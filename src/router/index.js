import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    { path: "/", redirect: { name: "login" } },
    {
        path: "/home",
        name: "home",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/Home.vue"),
        meta: {
            title: "Главная"
        }
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/Login.vue"),
        meta: {
            title: "Вход"
        }
    },
    {
        path: "/register",
        name: "register",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/Register.vue"),
        meta: {
            title: "Регистрация"
        }
    },
    /*admin */
    {
        path: "/users",
        name: "users",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/Users.vue"),
        meta: {
            title: "Сотрудники"
        }
    },
    {
        path: "/tasks",
        name: "users",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/Tasks.vue"),
        meta: {
            title: "Задачи"
        }
    },
];

const router = new VueRouter({
    routes,
    mode: "history"
});
router.beforeEach((to, from, next) => {
    document.title = to.meta.title + " | Pure";
    next();
});
export default router;