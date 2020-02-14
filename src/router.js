import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import List from './views/List.vue'
import Detail from './views/Detail.vue'

Vue.use(Router)

const routers = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {path: "/list", name: "list", component: List},
            {path: "/detail/:id", name: "detail", component: Detail, props: true},
        ]
    },
    {
        path: '/about',
        name: 'about',
        meta: {auth: true},
        beforeEnter(to, from, next) {
            if (!window.isLogin) {

            } else {
                next()
            }
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
]

const router = new Router({
    // mode: 'hash', // 模式 hash | history | abstract
    // base: process.env.BASE_URL,
    routes: []
})

router.addRoutes(routers)
router.beforeEach((to, from, next) => {
    if(to.meta.auth && !window.isLogin) {
        if (window.confirm('请登录')) {
            window.isLogin = true
            next()
        } else {
            next('/')
        }
    } else {
        next()
    }
})

export default router
