import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Начало',
      component: HomeView,
      meta: {
        layout: 'main'
      }
    },
    {
      path: '/help',
      name: 'Помощь',
      component: () => import('../views/HelpView.vue'),
      meta: {
        layout: 'main'
      }
    },
    {
      path: '/auth',
      name: 'Авторизация',
      component: () => import('../views/AuthView.vue'),
      meta: {
        layout: 'auth'
      }
    },
  ]
})

export default router
