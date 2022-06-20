import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login.vue') },
  {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/layout.vue'),
    children: [{ path: '', name: 'home', component: () => import('@/views/home.vue') },
      { path: '/answer', name: 'answer', component: () => import('@/views/answer.vue') },
      { path: '/vidieo', name: 'vidieo', component: () => import('@/views/vidieo.vue') },
      { path: '/my', name: 'my', component: () => import('@/views/my.vue') }
    ]

  }

]

const router = new VueRouter({
  routes
})

export default router
