import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import localStorage from '@/utils/localStorage'
const login = () => import('../views/login/Login.vue')
const main = () => import('../views/main/main.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: 'main'
  }, {
    path: "/login",
    name: 'login',
    component: login
  }, {
    path: "/main",
    name: 'main',
    component: main
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localStorage.getItem('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path == '/main') {
    return '/main/analysis/overview'
  }
})
export default router
