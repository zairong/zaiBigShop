//路由加載  全改成路由懶加載
//配置路由信息
export default [
  //home
  {
    name: "home",
    path: '/home',
    component: () => import('@/views/Home'),
    meta: { showFooter: true }
  },
  //center
  {
    name: "center",
    path: '/center',
    component: () => import('@/views/Center'),
    meta: { showFooter: true },
    children: [
      {
        name: "myorder",
        path: "myorder",  //  不用加/
        component: () => import('@/views/Center/MyOrder'),
        meta: { showFooter: true },
        
      },
      
      {
        name: "grouporder",
        path: "grouporder", //  不用加/
        component: () => import('@/views/Center/GroupOrder'),
        meta: { showFooter: true },

      },
      // 重定向
      {
        path: '/center',
        redirect: '/center/myorder'
      }

    ]
  },
  //PaySuccess
  {
    name: "paysuccess",
    path: '/paysuccess',
    component: () => import('@/views/PaySuccess'),
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      if (from.path == "/pay") {
        next()
      } else {
        alert('嘿嘿,你必須付完錢才能進來喔~~~你原地冷靜一下')
        next(false)
      }
    }
    
  },
  //pay
  {
    name: "pay",
    path: '/pay',
    component: () => import('@/views/Pay'),
    meta: { showFooter: true },
    //路由獨享守衛
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next()
      } else {
        alert('嘿嘿,你必須經過"填寫並核對訂單資訊"才能進來喔~~~你原地冷靜一下')
        next(false)
      }
    }
  },
  //trade
  {
    name: "trade",
    path: '/trade',
    component:() => import('@/views/Trade') ,
    meta: { showFooter: true },
    //路由獨享守衛
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart") {
        next()
      } else {
        alert('嘿嘿,你必須經過購物車結算才能進來喔~~~你原地冷靜一下')
        next(false)
      }
    }
  },
  //shopcart
  {
    name: "shopcart",
    path: '/shopcart',
    component:() => import('@/views/ShopCart') ,
    meta: { showFooter: true }
  },
  //addcartsuccess
  {
    name: "addcartsuccess",
    path: '/addcartsuccess',
    component: () => import('@/views/AddCartSuccess'),
    meta: { showFooter: true }
  },
  // login
  {
    name: "login",
    path: '/login',
    component: () => import('@/views/Login'),
    meta: { showFooter: false }
    
  },
  // register
  {
    name: "register",
    path: '/register',
    component: () => import('@/views/Register'),
    meta: { showFooter: false }
    
  },
  //search
  {
    name: "search",
    path: '/search/:keyword?',
    component: () => import('@/views/Search'),
    meta: { showFooter: true }
    
  },
  //detail
  {
    name: "detail",
    path: '/detail/:skuId',
    component: () => import('@/views/Detail'),
    meta: { showFooter: true }

  },
  // 重定向
  {
    path: '*',
    redirect: '/home',
    meta: { showFooter: true }

  }

]