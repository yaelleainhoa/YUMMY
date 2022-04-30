import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Page1 from "./App.vue"
import Page2 from "./components/RecipePage.vue"

const routes = [
  { path: '', component: Page1, name:"gallery"},
  { path: '/recipe/:id', component: Page2, name:"recipe" },
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