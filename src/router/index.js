import Vue from 'vue'
import VueRouter from 'vue-router'
import HOME from '../views/HOME.vue'
import FLOW from '../views/FLOW.vue'
import X6Page from '../components/X6-Page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HOME',
    component: HOME,
    redirect: '/FLOW',
    children: [
      {
        path: '/FLOW',
        name: 'FLOW',
        component: FLOW,
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
