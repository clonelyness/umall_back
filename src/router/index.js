import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)


function checkEnter(path, next) {
  //取出状态层中当前登录的用户的权限列表
  let menus_url = store.state.userInfo.menus_url;
  if (menus_url.includes(path)) {
    next()
  } else {
    next('/')
  }
}

export let indexRouters = [
  {
    path: 'menu',
    name: '菜单管理',
    component: () => import('../pages/menu/menu.vue'),

    //路由独享守卫
    beforeEnter(to, from, next) {
      let menus_url = store.state.userInfo.menus_url;
      if (menus_url.includes('/menu')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: 'role',
    name: '角色管理',
    component: () => import('../pages/role/role.vue'),

    //路由独享守卫
    beforeEnter(to, from, next) {
      checkEnter('/role', next)
    }

  },
  {
    path: 'cate',
    name: '商品分类管理',
    component: () => import('../pages/cate/cate.vue'),
    //路由独享守卫
    beforeEnter(to, from, next) {
      checkEnter('/cate', next)
    }

  },
  {
    path: 'goods',
    name: '商品管理',
    component: () => import('../pages/goods/goods.vue'),
    //路由独享守卫
    beforeEnter(to, from, next) {
      checkEnter('/goods', next)
    }
  },
  {
    path: 'manage',
    name: '管理员管理',
    component: () => import('../pages/manage/manage.vue'),
    //路由独享守卫
    beforeEnter(to, from, next) {
      checkEnter('/manage', next)
    }
  },
  {
    path: 'member',
    name: '会员管理',
    component: () => import('../pages/member/member.vue'),
    //路由独享守卫
    beforeEnter(to, from, next) {
      checkEnter('/member', next)
    }
  },
  {
    path: 'seckill',
    name: '秒杀管理',
    component: () => import('../pages/seckill/seckill.vue'),
    //路由独享守卫
    beforeEnter(to, from, next) {
      checkEnter('/seckill', next)
    }
  },
  {
    path: 'specs',
    name: '商品规格管理',
    component: () => import('../pages/specs/specs.vue'),
    //路由独享守卫
    beforeEnter(to, from, next) {
      checkEnter('/specs', next)
    }
  },
  {
    path: 'banner',
    name: '轮播图管理',
    component: () => import('../pages/banner/banner.vue'),
    //路由独享守卫
    beforeEnter(to, from, next) {
      checkEnter('/banner', next)
    }
  },
]



let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../pages/login/login.vue')
    },
    {
      path: '/',
      component: () => import('../pages/index/index.vue'),
      children: [
        {
          path: '',

          component: () => import('../pages/home/home.vue')
        },
        ...indexRouters
      ]
    },
  ]
})

//登录拦截
router.beforeEach((to, from, next) => {

  // 1.前往登录(放行)
  if (to.path == '/login') {
    next()
    return
  }

  //2.如果前往不是登录,查看是否登录,登陆了就放行,否则,到登录
  // console.log(store);用户信息在store.state.userInfo.token

  if (store.state.userInfo.token) {
    next()
    return
  }
  next('/login')
})





export default router