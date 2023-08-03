import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { isLoggedIn: false}
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { isLoggedIn: false}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { isLoggedIn: false}
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { isLoggedIn: true},
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../views/ProfileView.vue'),
        meta: { isLoggedIn: true}
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/DashboardHomeView.vue'),
        meta: { isLoggedIn: true}
      }
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if ('isLoggedIn' in to.meta, to.meta.isLoggedIn && !store.state.isLoggedIn) {
    next('/login')
  }else if('isLoggedIn' in to.meta, !to.meta.isLoggedIn && store.state.isLoggedIn){
    next('/dashboard')
  }else{
    next()
  }
})

export default router
