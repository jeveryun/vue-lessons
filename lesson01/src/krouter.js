import Vue from 'vue'
import Home from './views/Home.vue'
import About from './views/About.vue'

class VueRouter {
    constructor(options) {
        this.$options = options
        this.routeMap = {}

        // 路由响应式
        this.app = new Vue({
            data: {
                current: '/'
            }
        })
    }

    init() {
        this.bindEvents()
        this.createRouteMap(this.$options)
        this.initComponent()
    }

    bindEvents() {
        window.addEventListener('load', this.onHashChange.bind(this))
        window.addEventListener('hashchange', this.onHashChange.bind(this))
    }

    onHashChange() {
        this.app.current = window.location.hash.slice(1) || '/'
    }

    createRouteMap(options) {
        options.routes.forEach(item => {
            this.routeMap[item.path] = item.component
        })
    }

    initComponent() {
        console.log(111)
        Vue.component('router-link', {
            props: {to: String},
            render(h) {
                console.log(222)
                return h('a', {attrs: {href: '#' + this.to}}, [this.$slots.default])
            }
        })

        Vue.component('router-view', {
            render: (h) => {
                console.log(333)
                const comp = this.routeMap[this.app.current]
                return h(comp)
            }
        })
    }
}

VueRouter.install = function (Vue) {
    // 混入
    Vue.mixin({
        beforeCreate() {
            // this是Vue实例
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
                this.$options.router.init()
            }
        }
    })
}

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        }]
})
export default router
