import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/authentication/Register'
import Login from '@/components/authentication/Login'
import Justify from '@/components/Justify'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/api/register',
      name: 'register',
      component: Register
    },
    {
      path: '/api/token',
      name: 'login',
      component: Login
    },
    {
      path: '/api/justify',
      name: 'justify',
      component: Justify
    },
  ]
})
