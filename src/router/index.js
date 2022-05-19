import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Начало',
      component: HomeView,
      meta: {
        layout: 'main',
        auth: true
      }
    },
    {
      path: '/help',
      name: 'Помощь',
      component: () => import('../views/HelpView.vue'),
      meta: {
        layout: 'main',
        auth: true
      }
    },
    {
      path: '/auth',
      name: 'Авторизация',
      component: () => import('../views/AuthView.vue'),
      meta: {
        layout: 'auth',
        auth: false
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  if (requireAuth && store.getters['auth/isAuthenticated']) {

  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    nextTick('/auth?message=auth')
  } else {
    next()
  }
})

export default router
