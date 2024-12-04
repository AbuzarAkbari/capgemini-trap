import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import ProgressiePage from '../views/ProgressiePage.vue'
import GamePage from '../views/GamePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage
    },
    {
      path: '/progressie',
      name: 'progressie',
      component: ProgressiePage
    },
    {
      path: '/game',
      name: 'game',
      component: GamePage
    }
  ]
})

export default router 