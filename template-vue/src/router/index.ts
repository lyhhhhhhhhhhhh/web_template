import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/login/RegisterView.vue')
    },
    {
      path: '/',
      component: () => import('@/layout/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: { requiresAuth: true, title: '首页' }
        },
        {
          path: '/user',
          name: 'userManagement',
          component: () => import('@/views/user/UserManagement.vue'),
          meta: { requiresAuth: true, title: '用户管理', isAdmin: true }
        },
        {
          path: '/profile',
          name: 'userProfile',
          component: () => import('@/views/user/UserProfile.vue'),
          meta: { requiresAuth: true, title: '个人资料' }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 检查路由是否需要认证
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // 检查权限
  if (to.meta.isAdmin && !userStore.isAdmin) {
    ElMessage.error('没有访问权限')
    next({ name: 'home' })
    return
  }

  next()
})

export default router 