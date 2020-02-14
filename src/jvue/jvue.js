// new JVue({
//     data: {
//         msg: 'hello'
//     }
// })

class JVue {
    constructor(options) {
        this.$options = options

        this.$data = options.data

        this.observe(this.$data)

        new Compile(options.el, this)

        if (options.created) {
            options.created.call(this)
        }
    }

    // 递归遍历，使传递进来的对象响应化
    observe(value) {
        if (!value || typeof value !== 'object') {
            return
        }
        Object.keys(value).forEach(key => {
            this.defineReactive(value, key, value[key])
            this.proxyData(key)

        })
    }

    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal
            }
        })
    }

    defineReactive(obj, key, val) {
        this.observe(val)

        // 创建Dep实例， Dep和Key是一对一对应
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            get() {
                // 将Dep.target指向的watcher实例加入到Dep中
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newVal) {
                if (newVal !== val) {
                    val = newVal
                    dep.notify()
                }
            }
        })
    }
}


// Dep 管理若干watcher实例，他和key 一对一关系
class Dep {
    constructor(){
        this.deps = []
    }

    addDep(watcher) {
        this.deps.push(watcher)
    }

    notify() {
        this.deps.forEach(watcher => watcher.update())
    }
 }

 // 保存UI中依赖，实现update函数，可以更新之
 class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb

        // 将当前实例指向Dep.target
        Dep.target = this
        this.vm[this.key]
        Dep.target = null
    }

    update(){
        this.cb.call(this.vm, this.vm[this.key])
        console.log(`${this.key}属性更新了~~~`)
    }
}
