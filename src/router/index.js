import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'
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
        meta: {
          requiresAuth: true,
          userAuth: true
        },
        redirect: 'user/:id/video',
        children: [
          {
            path: 'video',
            component: () => import('../components/Camera.vue'),
            name: 'video',
            meta: {
              requiresAuth: true,
              userAuth: true
            }
          },
          {
            path: 'users',
            component: () => import('../components/Users.vue'),
            name: 'users',
            meta: {
              requiresAuth: true,
              adminAuth: true
            }
          },
          {
            path: 'scanner',
            component: () => import('../components/QRCodeScan.vue'),
            name: 'scanner',
            meta: {
              requiresAuth: true,
              userAuth: true
            }
          }
        ]
      }
    ]
  },

  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const role = store.getters.getUser.role
  const accessToken = store.getters.getToken
  console.log('role', role)
  if (to.meta.requiresAuth) {
    if (accessToken) {
      if (to.meta.userAuth) {
        if (role === 'user' || role === 'admin' || !role) {
          return next()
        } else {
          router.push({
            path: '/login'
          })
        }
      } else if (to.meta.adminAuth) {
        if (role === 'admin') {
          return next()
        } else {
          router.push({
            path: '/404'
          })
        }
      }
    }
  } else {
    return next()
  }
})

export default router
