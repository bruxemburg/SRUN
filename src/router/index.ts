import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import AlarmsView from '../views/AlarmsView.vue'
import AlarmSettingsView from '../views/AlarmSettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/alarms',
    },
    {
      path: '/alarms',
      name: 'alarms',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AlarmsView,
    },
    {
      path: '/alarm/:id',
      name: 'alarm',
      component: AlarmSettingsView,
    },
  ],
})

export default router
