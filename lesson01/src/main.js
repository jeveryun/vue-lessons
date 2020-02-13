import Vue from 'vue'
import App from './App'
import create from '@/utils/create'
import router from './krouter'

Vue.config.productionTip = false
Vue.prototype.$dispatch = function (eventName, data) {
  let parent = this.$parent
  while (parent) {
    if (parent) {
      parent.$emit(eventName, data)
      parent = parent.$parent
    } else {
      break
    }
  }
}

Vue.prototype.$boardcast = function (eventName, data) {
  boardcast.call(this, eventName, data)
}

function boardcast (eventName, data) {
  this.$children.forEach(child => {
    child.$emit(eventName, data)
    if (child.$children.length) {
      boardcast.call(child, eventName, data)
    }
  })
}

class Bus {
  constructor() {
    this.callbacks = {}
  }
  $on (name, fn) {
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(fn)
  }
  $emit (name, args) {
    this.callbacks[name].forEach(cb => cb(args))
  }
}

Vue.prototype.$bus = new Bus()
Vue.prototype.$create = create

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
