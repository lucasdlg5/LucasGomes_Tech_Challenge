import Vue from 'vue'
import Router from 'vue-router'
import home from "./components/Home";
import login from "./components/Login.vue";
Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/home',
            name: 'home',
            component: home
        },
    ]
});

export default router