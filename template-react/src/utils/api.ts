import axios from 'axios';
import { message } from 'antd';

// 创建axios实例
export const api = axios.create({
  baseURL: '/api', // 对应后端的context-path
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    const { data } = response;
    // 根据后端的返回结构处理
    if (data.code !== 0) {
      message.error(data.message || '请求失败');
      return Promise.reject(new Error(data.message || 'Error'));
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // 处理常见的HTTP错误
      switch (status) {
        case 401:
          message.error('未登录或登录过期，请重新登录');
          // 清除token并跳转到登录页
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          message.error('没有权限访问');
          break;
        case 404:
          message.error('请求的资源不存在');
          break;
        case 500:
          message.error('服务器错误，请稍后再试');
          break;
        default:
          message.error(`请求错误 (${status})`);
      }
    } else if (error.request) {
      message.error('无法连接到服务器，请检查网络');
    } else {
      message.error('请求出错: ' + error.message);
    }
    return Promise.reject(error);
  }
); 