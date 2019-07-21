import Vue from 'vue'
import VueRouter from 'vue-router'

import dashboard from '@/components/dashboard.vue'
import landing from '@/components/landing.vue'
import apiexample from '@/components/api-example.vue'
import signup from '@/components/signup.vue'
import signin from '@/components/signin.vue'
import profile from '@/components/profile.vue'

const routes = [
  { path: '*', component: landing },
  { path: '/signup', component: signup },
  { path: '/signin', component: signin },
  { path: '/dashboard', component: dashboard, name:'dashboard' },
  { path: '/profile', component: profile }
]

Vue.use(VueRouter)
const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) { return { x: 0, y: 0 } },
  mode: 'history',
  routes
})

export default router
