import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import X6Page from '../components/X6-Page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/x6page',
    children: [
      {
        path: '/x6page',
        name: 'x6page',
        component: X6Page
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
