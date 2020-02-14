// 遍历模板，将里面的插值表达式处理
// 处理指令和事件
class Compile {
    constructor(el, vm) {
        this.$el = document.querySelector(el)
        this.$vm = vm

        if (this.$el) {
            this.$fragment = this.node2Fragment(this.$el)
            // console.log(this.$fragment)
            this.compile(this.$fragment)
            // console.log(this.$fragment)
            this.$el.appendChild(this.$fragment)
        }
    }

    node2Fragment(el) {
        const fragment = document.createDocumentFragment()
        let child
        while ((child = el.firstChild)) {
            fragment.appendChild(child)
        }
        return fragment
    }

    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if (this.isElement(node)) {
                this.compileElement(node)
            } else if (this.isInterpolation(node)) {
                // console.log(`编译文本：${node.textContent}`)
                this.compileText(node)
            }

            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    isElement(node) {
        return node.nodeType === 1
    }

    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    compileText(node) {
        // console.log(RegExp.$1)
        // node.textContent = this.$vm[RegExp.$1]
        const exp = RegExp.$1
        this.update(node, this.$vm, exp, 'text')
    }

    compileElement(node) {
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.name
            const exp = attr.value
            if (attrName.indexOf('k-') === 0) {
                const dir = attrName.substring(2)
                this[dir] && this[dir](node, this.$vm, exp)
            } else if (attrName.indexOf('@') === 0) {
                const eventName = attrName.substring(1)
                this.eventHandler(node, this.$vm, exp, eventName)
            }
        })
    }

    text(node, vm, exp) {
        this.update(node, vm, exp, 'text')
    }

    model(node, vm, exp) {
        this.update(node, vm, exp, 'model')
        node.addEventListener('input', e => {
            vm[exp] = e.target.value
        })
    }

    html(node, vm, exp) {
        this.update(node, vm, exp, 'html')
    }

    update(node, vm, exp, dir) {
        const fn = this[dir + 'Updator']
        fn && fn(node, vm[exp])
        new Watcher(vm, exp, function () {
            fn && fn(node, vm[exp])
        })
    }

    eventHandler(node, vm, exp, eventName) {
        const fn = vm.$options.methods && vm.$options.methods[exp]
        if (eventName && fn) {
            node.addEventListener(eventName, fn.bind(vm))
        }
    }

    textUpdator(node, value) {
        node.textContent = value
    }

    modelUpdator(node, value) {
        node.value = value
    }
    htmlUpdator(node, value) {
        node.innerHTML = value
    }
}
