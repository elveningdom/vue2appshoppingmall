import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("../views/HomeView.vue")
  },
  {
    path: '/class',
    name: 'class',
    component: () => import('../views/ClassView.vue')
  },
  {
    path: '/shoppingcar',
    name: 'shoppingcar',
    component: () => import('../views/ShoppingCarView.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/MineView.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/DetailView.vue'),
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('../views/PayView.vue'),
    meta: {
      isLogin: true,
      isShoppingcarFrom: true,
    },
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('../views/AddressView.vue')
  },
  {
    path: '/addressedit/:id?',
    name: 'addressedit',
    component: () => import('../views/AddressEditView.vue')
  },

]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {

//   if (to.meta && to.meta.isLogin) {
//     let userinfo = window.localStorage.getItem("userinfo")
//     if (userinfo) {
//       if(to.path=="/pay"&&from.path=="/shoppingcar"){
//         next()
//       }else{
//         next("/")
//       }
//       next()
//     }
//     else {
//       console.log(to)
//       window.localStorage.setItem("backUrl", to.path)
//       next("/mine")
//     }
//   }
//   next()
// }
// )

export default router
