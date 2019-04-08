import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

const Weather = () => import('./modules/weather/Index.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'weather',
          component: Weather
        }
      ]
    }
  ]
})

export default router