import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'

// 创建axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
    withCredentials: true
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 如果有token，则添加到请求头
    //   const satoken = localStorage.getItem("token")
    //   console.log(satoken)
    //   if (satoken) {
    //     config.headers['token'] = satoken
    //   }
    return config
  },
  error => {
    console.error('请求错误', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data

    // 如果返回的状态码不是0，则判断为错误
    if (res.code !== 0) {
      ElMessage.error(res.message || '错误')

      // 40100: 未登录; 40101: 无权限; 40300: 禁止访问
      if (res.code === 40100 || res.code === 40101 || res.code === 40300) {
        // 重新登录
        ElMessage.error('登录状态已过期，请重新登录')
        // 清空用户信息
        useUserStore().resetUserInfo()
        // 跳转到登录页
        router.push(`/login?redirect=${router.currentRoute.value.fullPath}`)
      }

      return Promise.reject(new Error(res.message || '错误'))
    } else {
      return res
    }
  },
  error => {
    console.error('响应错误', error)
    ElMessage.error(error.message || '请求失败')
    return Promise.reject(error)
  }
)

export default request 