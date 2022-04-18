import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { isAuthenticated } from '../store/getters'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/login',
    children: [
      { path: '/login', component: () => import('../components/LogIn.vue'), name: 'login' },
      {
        path: 'user/:id/',
        name: 'user',
        component: () => import('../components/Dashboard.vue'),
        redirect: 'user/:id/video',
        children: [
          {
            path: 'video', component: () => import('../components/Camera.vue'), name: 'video'
          },
          {
            path: 'users', component: () => import('../components/Users.vue')
          }
        ]
      }
    ]
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
  else next()
})

export default router
