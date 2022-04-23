import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueMq from 'vue-mq'

import Page1 from "./App.vue"
import Page2 from "./components/RecipePage.vue"

Vue.use(VueMq, {
  breakpoints: {
    small: 450,
    large: Infinity,
  }
})

const routes = [
  { path: '', component: Page1, name:"gallery"},
  { path: '/recipe', component: Page2, name:"recipe" },
  { path: '*', redirect: '/'},
]
Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes
})

new Vue({
router,
render: h => h(App)
}).$mount('#app')