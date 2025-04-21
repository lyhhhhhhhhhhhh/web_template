# Vue 3 后台管理系统模板

这是一个基于Vue 3 + TypeScript + Vite + Element Plus + Pinia + Axios的后台管理系统前端模板，与Spring Boot后端模板配套使用。

## 技术栈

- Vue 3 - 渐进式JavaScript框架
- TypeScript - 带有类型检查的JavaScript超集
- Vite - 下一代前端构建工具
- Element Plus - 基于Vue 3的UI组件库
- Pinia - Vue的状态管理库
- Axios - 基于Promise的HTTP客户端
- OpenAPI - 用于从后端API自动生成TypeScript客户端代码
- Vue Router - Vue.js官方的路由管理器

## 功能特性

- 用户认证：登录、注销、权限控制
- 用户管理：用户列表、添加、编辑、删除用户
- 权限管理：权限列表、添加、编辑、删除权限
- 个人资料：查看和修改个人信息
- 自适应布局：适配不同尺寸的屏幕
- API自动生成：基于后端Swagger文档自动生成API客户端

## 项目结构

```
src/
├── api/            # API相关代码
│   └── generated/  # 自动生成的API客户端代码
├── assets/         # 静态资源
├── components/     # 公共组件
├── layout/         # 布局组件
├── router/         # 路由配置
├── stores/         # Pinia状态管理
├── utils/          # 工具函数
└── views/          # 页面视图
    ├── login/      # 登录页面
    ├── user/       # 用户管理相关页面
    └── permission/ # 权限管理相关页面
```

## 快速开始

### 环境要求

- Node.js 16+
- npm 7+ 或 yarn 1.22+

### 安装依赖

```bash
cd template-vue
npm install
# 或
yarn install
```

### 生成API客户端

确保后端服务已启动，并且API文档可访问，然后运行：

```bash
npm run generate-api
# 或
yarn generate-api
```

这将从后端的Swagger文档自动生成TypeScript API客户端代码。

### 开发环境运行

```bash
npm run dev
# 或
yarn dev
```

然后在浏览器中访问 http://localhost:3000

### 生产环境构建

```bash
npm run build
# 或
yarn build
```

构建后的文件将生成在 `dist` 目录下。

## 配置说明

### 环境变量

项目使用 `.env` 文件管理环境变量：

- `.env.development`：开发环境配置
- `.env.production`：生产环境配置（需手动创建）

### 代理配置

在开发环境中，API请求会被代理到后端服务器。代理配置位于 `vite.config.ts` 文件中：

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
},
```

## 权限控制

系统使用基于角色和权限的控制机制：

- 路由权限：在路由配置中通过meta.permission定义所需权限
- 组件权限：在组件中通过userStore.hasPermission()函数检查权限
- 按钮权限：根据用户权限动态显示或隐藏按钮

## 开发指南

### 添加新页面

1. 在 `src/views` 中创建新的Vue组件
2. 在 `src/router/index.ts` 中添加路由配置
3. 如需添加到菜单，在 `src/layout/DefaultLayout.vue` 中的menus数组中添加配置

### 状态管理

使用Pinia进行状态管理，可在 `src/stores` 目录下创建新的store：

```typescript
import { defineStore } from 'pinia'

export const useYourStore = defineStore('your-store', {
  state: () => ({
    // 你的状态
  }),
  getters: {
    // 计算属性
  },
  actions: {
    // 方法
  }
})
```

## 测试账号

- 管理员：账号 admin，密码 123456
- 普通用户：需要通过管理员创建 