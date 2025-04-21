import { defineStore } from 'pinia'
import {SaTokenInfo, UserVO} from '@/api/generated'
import router from '@/router'
import { ElMessage } from 'element-plus'
import {getCurrentUserUsingGet, userLoginUsingPost, userLogoutUsingPost} from "@/api/yonghujiekou.ts";

interface UserState {
  id: string | null
  token: string | null
  account: string
  userName: string
  userRole: string
  avatar: string
  permissions: string[]
  token: SaTokenInfo
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: null,
    token: null,
    account: '',
    userName: '',
    userRole: '',
    avatar: '',
    permissions: []
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.userRole === 'admin',
    hasPermission: (state) => (permission: string) => {
      if (state.userRole === 'admin') return true
      return state.permissions.includes(permission)
    }
  },
  actions: {
    async login(userAccount: string, userPassword: string) {
      try {
        const response = await userLoginUsingPost({
          userAccount,
          userPassword
        })

        if (response.data && response.code === 0) {
          this.setUserInfo(response.data)
          localStorage.setItem("token", response.data.token.tokenValue)
          ElMessage.success('登录成功')

          // 获取重定向地址，如果没有则默认首页
          const redirectPath = router.currentRoute.value.query.redirect as string || '/'
          router.push(redirectPath)
          return true
        } else {
          ElMessage.error(response.message || '登录失败')
          return false
        }
      } catch (error) {
        console.error('登录失败', error)
        ElMessage.error('登录失败，请检查网络连接')
        return false
      }
    },

    setUserInfo(user: any) {
      this.id = user.id
      this.token = user.token
      this.account = user.userAccount || ''
      this.userName = user.userName || ''
      this.userRole = user.userRole || ''
      this.avatar = user.userAvatar || ''
      this.permissions = user.permissions || []
    },

    async logout() {
      try {
        await userLogoutUsingPost()
        this.resetUserInfo()
        router.push('/login')
        ElMessage.success('已退出登录')
      } catch (error) {
        console.error('退出登录失败', error)
        // 即使API调用失败，也清空本地状态
        this.resetUserInfo()
        router.push('/login')
      }
    },

    resetUserInfo() {
      this.id = null
      this.token = ''
      this.account = ''
      this.userName = ''
      this.userRole = ''
      this.avatar = ''
      this.permissions = []
    },

    async fetchCurrentUser() {
      if (!this.token) return false

      try {
        const response = await getCurrentUserUsingGet()
        if (response.data && response.code === 0) {
          this.setUserInfo(response.data)
          return true
        } else {
          this.resetUserInfo()
          return false
        }
      } catch (error) {
        console.error('获取用户信息失败', error)
        this.resetUserInfo()
        return false
      }
    }
  },
  persist: {
    key: 'user-store',
    storage: localStorage,
    paths: ['token', 'id', 'account', 'userName', 'userRole', 'avatar', 'permissions']
  }
}) 